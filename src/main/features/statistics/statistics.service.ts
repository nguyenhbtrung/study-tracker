import { StatisticsResponse } from '../../../shared/types/statistics.types';
import { SessionRepository } from '../../entities/session/session.repository';
import { Injectable } from '@ntrg/simple-di';

@Injectable()
export class StatisticsService {
  constructor(private readonly sessionRepo: SessionRepository) {}

  private buildHourlyStatistics(
    sessions: {
      start_time: number;
      end_time: number;
    }[],
  ) {
    const hourlyMinutes = Array.from({ length: 24 }).map((_, hour) => ({
      hour,
      minutes: 0,
    }));

    for (const session of sessions) {
      let current = session.start_time;

      while (current < session.end_time) {
        const currentDate = new Date(current);

        /**
         * End of current hour
         */
        const nextHour = new Date(current);

        nextHour.setMinutes(60, 0, 0);

        const segmentEnd = Math.min(nextHour.getTime(), session.end_time);

        const diffMinutes = (segmentEnd - current) / 1000 / 60;

        hourlyMinutes[currentDate.getHours()].minutes += diffMinutes;

        current = segmentEnd;
      }
    }

    return hourlyMinutes.map((item) => ({
      hour: item.hour,
      minutes: Math.round(item.minutes),
    }));
  }

  getStatistics(): StatisticsResponse {
    const daily = this.sessionRepo.getDailyStatistics();

    const sessions = this.sessionRepo.getAllSessions();

    const hourly = this.buildHourlyStatistics(sessions);

    const sessionsByDate = Object.fromEntries(
      daily.map((item) => [
        item.date,
        this.sessionRepo.getSessionsByDate(item.date),
      ]),
    );

    return {
      contributionData: daily.map((item) => ({
        date: item.date,
        minutes: item.minutes,
      })),

      trendData: daily.map((item) => ({
        date: item.date,
        minutes: item.minutes,
        sessions: item.sessions,
        focusScore: Math.min(
          100,
          Math.round(item.minutes / Math.max(item.sessions, 1)),
        ),
      })),

      productivityData: Array.from({ length: 24 }).map((_, hour) => {
        const found = hourly.find((h) => h.hour === hour);

        return {
          hour,
          minutes: found?.minutes ?? 0,
        };
      }),

      sessionsByDate: Object.fromEntries(
        Object.entries(sessionsByDate).map(([date, sessions]) => [
          date,
          sessions.map((session: any) => ({
            id: String(session.id),

            title: 'Study Session',

            startTime: new Date(session.start_time).toISOString(),

            endTime: new Date(session.end_time).toISOString(),

            durationMinutes: session.durationMinutes,
          })),
        ]),
      ),
      daily,
    };
  }
}
