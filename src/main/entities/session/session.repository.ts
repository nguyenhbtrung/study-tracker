import { Injectable } from '@ntrg/simple-di';

import { db } from '../../shared/db/client';

import { Session } from './session.model';
import { DailyStatistics } from '../../../shared/types/statistics.types';

type TotalRow = {
  total: number | null;
};

type TodayRow = {
  today: number | null;
};

type HourlyRow = {
  hour: number;
  minutes: number;
};

@Injectable()
export class SessionRepository {
  create(session: Session) {
    return db
      .prepare(
        `
        INSERT INTO sessions (start_time, end_time, duration)
        VALUES (?, ?, ?)
      `,
      )
      .run(session.start_time, session.end_time, session.duration);
  }

  getTotal(): number {
    const row = db
      .prepare(`SELECT SUM(duration) as total FROM sessions`)
      .get() as TotalRow;

    return row?.total ?? 0;
  }

  getToday(startOfDay: number): number {
    const row = db
      .prepare(
        `
        SELECT SUM(duration) as today
        FROM sessions
        WHERE start_time >= ?
      `,
      )
      .get(startOfDay) as TodayRow;

    return row?.today ?? 0;
  }

  getDailyStatistics(): DailyStatistics[] {
    return db
      .prepare(
        `
        SELECT
          strftime('%Y-%m-%d', start_time / 1000, 'unixepoch', 'localtime') as date,
          ROUND(SUM(duration) / 60000.0) as minutes,
          COUNT(*) as sessions
        FROM sessions
        GROUP BY date
        ORDER BY date ASC
      `,
      )
      .all() as DailyStatistics[];
  }

  getAllSessions() {
    return db
      .prepare(
        `
      SELECT
        id,
        start_time,
        end_time,
        duration
      FROM sessions
      ORDER BY start_time ASC
    `,
      )
      .all() as Session[];
  }

  getSessionsByDate(date: string) {
    return db
      .prepare(
        `
        SELECT
          id,
          start_time,
          end_time,
          ROUND(duration / 60000.0) as durationMinutes
        FROM sessions
        WHERE strftime(
          '%Y-%m-%d',
          start_time / 1000,
          'unixepoch',
          'localtime'
        ) = ?
        ORDER BY start_time ASC
      `,
      )
      .all(date);
  }
}
