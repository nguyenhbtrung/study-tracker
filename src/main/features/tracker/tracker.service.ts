import { Injectable } from '@ntrg/simple-di';
import { SessionRepository } from '@main/entities/session/session.repository';
import { StatsResponse } from '@shared/types/tracker.types';

@Injectable()
export class TrackerService {
  private startTime: number | null = null;
  private pausedAt: number | null = null;
  private accumulatedPauseMs = 0;

  constructor(private readonly sessionRepo: SessionRepository) {}

  start() {
    if (this.startTime) {
      return;
    }

    this.startTime = Date.now();

    this.pausedAt = null;
    this.accumulatedPauseMs = 0;
  }

  stop() {
    if (!this.startTime) {
      return;
    }

    const end = this.pausedAt ?? Date.now();

    const duration = end - this.startTime - this.accumulatedPauseMs;

    this.sessionRepo.create({
      start_time: this.startTime,
      end_time: end,
      duration,
    });

    this.startTime = null;
    this.pausedAt = null;
    this.accumulatedPauseMs = 0;
  }

  pause() {
    if (!this.startTime) {
      return;
    }

    if (this.pausedAt) {
      return;
    }

    this.pausedAt = Date.now();
  }

  resume() {
    if (!this.startTime) {
      return;
    }

    if (!this.pausedAt) {
      return;
    }

    this.accumulatedPauseMs += Date.now() - this.pausedAt;

    this.pausedAt = null;
  }

  getStats(): StatsResponse {
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const total = this.sessionRepo.getTotal();

    const today = this.sessionRepo.getToday(startOfDay.getTime());

    let current = 0;

    if (this.startTime) {
      const now = this.pausedAt ?? Date.now();

      current = now - this.startTime - this.accumulatedPauseMs;
    }

    return {
      currentSession: current,
      today: today + current,
      total: total + current,

      isTracking: !!this.startTime,

      isPaused: !!this.pausedAt,
    };
  }

  startTracking() {
    this.start();
  }

  stopTracking() {
    this.stop();
  }

  pauseTracking() {
    this.pause();
  }

  resumeTracking() {
    this.resume();
  }
}
