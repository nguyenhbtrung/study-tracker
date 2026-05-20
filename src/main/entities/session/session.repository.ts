import { Injectable } from '@ntrg/simple-di';
import { db } from '../../shared/db/client';
import { Session } from './session.model';

type TotalRow = { total: number | null };
type TodayRow = { today: number | null };

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
}
