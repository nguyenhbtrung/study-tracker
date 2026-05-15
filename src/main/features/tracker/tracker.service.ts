import { SessionRepository } from '../../entities/session/session.repository';

let startTime: number | null = null;

export class TrackerService {
  private repo = new SessionRepository();

  start() {
    if (!startTime) startTime = Date.now();
  }

  stop() {
    if (!startTime) return;

    const end = Date.now();
    const duration = end - startTime;

    this.repo.create({
      start_time: startTime,
      end_time: end,
      duration,
    });

    startTime = null;
  }

  getStats() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const total = this.repo.getTotal();
    const today = this.repo.getToday(startOfDay.getTime());
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
