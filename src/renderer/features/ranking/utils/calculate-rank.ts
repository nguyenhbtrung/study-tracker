import { differenceInCalendarDays } from 'date-fns';

import { RANK_TIERS } from './rank-config';

import type { StudySession } from '../../statistics';

import type { DailyStatistics } from '@shared/types/statistics.types';

import { buildWeeklyMissions, calculateMissionXp } from './weekly-missions';

export function calculateRank(
  sessions: StudySession[],
  daily: DailyStatistics[],
) {
  /**
   * TOTALS
   */
  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.durationMinutes,
    0,
  );

  const totalHours = totalMinutes / 60;

  const sessionsCount = sessions.length;

  /**
   * DAILY FOCUS
   */
  const averageFocus =
    daily.length > 0
      ? daily.reduce((sum, day) => sum + day.focusScore, 0) / daily.length
      : 0;

  /**
   * STREAK
   */
  const dates = daily.map((d) => d.date).sort();

  let longestStreak = 0;

  let currentStreak = 0;

  let streak = 0;

  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const prev = new Date(dates[i - 1]);

      const curr = new Date(dates[i]);

      const diff = differenceInCalendarDays(curr, prev);

      if (diff === 1) {
        streak++;
      } else {
        streak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, streak);
  }

  /**
   * CURRENT STREAK
   */
  for (let i = dates.length - 1; i >= 0; i--) {
    const curr = new Date(dates[i]);

    const diff = differenceInCalendarDays(new Date(), curr);

    if (diff === currentStreak || diff === currentStreak + 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  /**
   * XP REWARDS
   */

  /**
   * Base study XP
   */
  const studyXp = totalHours * 20;

  /**
   * Focus reward
   */
  const focusXp = averageFocus * 18;

  /**
   * Streak reward
   */
  const streakXp = longestStreak * 100;

  /**
   * Activity reward
   */
  const activityXp = sessionsCount * 4;

  /**
   * Consistency reward
   *
   * Reward users studying regularly.
   */
  const consistencyBonus =
    currentStreak >= 30
      ? 3000
      : currentStreak >= 14
        ? 1200
        : currentStreak >= 7
          ? 500
          : 0;

  /**
   * Marathon reward
   */
  const marathonBonus =
    totalHours >= 500
      ? 5000
      : totalHours >= 250
        ? 2000
        : totalHours >= 100
          ? 800
          : 0;

  /**
   * PENALTIES
   */

  /**
   * Low focus penalty
   */
  const focusDeficit = Math.max(0, 30 - averageFocus);

  const lowFocusPenalty = Math.round(focusDeficit * focusDeficit * 1.2);

  /**
   * Session spam penalty
   *
   * Penalize users creating too many tiny sessions.
   */
  const shortSessions = sessions.filter((s) => s.durationMinutes < 10).length;

  const spamPenalty = shortSessions * 15;

  /**
   * Inconsistent study penalty
   */
  const inactiveDaysPenalty =
    dates.length > 0 ? Math.max(0, 365 - dates.length) * 2 : 0;

  /**
   * AFK-style penalty
   *
   * Extremely long sessions may indicate AFK.
   */
  const suspiciousSessions = sessions.filter(
    (s) => s.durationMinutes >= 600,
  ).length;

  const afkPenalty = suspiciousSessions * 300;

  /**
   * WEEKLY MISSIONS
   */
  const weeklyMissions = buildWeeklyMissions(sessions);

  const missionXp = calculateMissionXp(weeklyMissions);

  /**
   * TOTAL XP
   */
  const totalXp = Math.max(
    0,
    Math.floor(
      studyXp +
        focusXp +
        streakXp +
        activityXp +
        missionXp +
        consistencyBonus +
        marathonBonus -
        lowFocusPenalty -
        spamPenalty -
        inactiveDaysPenalty -
        afkPenalty,
    ),
  );

  /**
   * RANK
   */
  let currentRank = RANK_TIERS[0];

  let nextRank = RANK_TIERS[1];

  for (let i = 0; i < RANK_TIERS.length; i++) {
    const tier = RANK_TIERS[i];

    if (totalXp >= tier.minXp) {
      currentRank = tier;

      nextRank = RANK_TIERS[i + 1] ?? tier;
    }
  }

  /**
   * PROGRESS
   */
  const currentMinXp = currentRank.minXp;

  const nextMinXp = nextRank.minXp;

  const progress =
    currentRank === nextRank
      ? 100
      : ((totalXp - currentMinXp) / (nextMinXp - currentMinXp)) * 100;

  return {
    totalXp,

    totalHours,

    averageFocus,

    longestStreak,

    currentStreak,

    sessionsCount,

    currentRank,

    nextRank,

    progress,

    missionXp,

    weeklyMissions,

    penalties: {
      lowFocusPenalty,
      spamPenalty,
      inactiveDaysPenalty,
      afkPenalty,
    },

    bonuses: {
      consistencyBonus,
      marathonBonus,
    },
  };
}
