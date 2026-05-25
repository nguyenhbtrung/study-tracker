import { Injectable } from '@ntrg/simple-di';
import { SessionRepository } from '../../entities/session/session.repository';

let startTime: number | null = null;

@Injectable()
export class TrackerService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  start() {
    if (!startTime) {
      startTime = Date.now();
    }
  }

  stop() {
    if (!startTime) {
      return;
    }

    const end = Date.now();

    const duration = end - startTime;

    this.sessionRepo.create({
      start_time: startTime,
      end_time: end,
      duration,
    });

    startTime = null;
  }

  getStats() {
    const startOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);

    const total = this.sessionRepo.getTotal();

    const today = this.sessionRepo.getToday(startOfDay.getTime());

    const current = startTime ? Date.now() - startTime : 0;

    return {
      today: today + current,
      total: total + current,
    };
  }

  startTracking() {
    this.start();
  }

  stopTracking() {
    this.stop();
  }
}
