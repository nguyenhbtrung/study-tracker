import {
  differenceInCalendarDays,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export type ContributionData = {
  date: string;
  minutes: number;
};

export type StatisticsSummary = {
  todayMinutes: number;
  weekMinutes: number;
  monthMinutes: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
};

export function calculateStatistics(
  data: ContributionData[],
): StatisticsSummary {
  const today = new Date();

  const todayKey = format(today, 'yyyy-MM-dd');

  const weekStart = startOfWeek(today);

  const monthStart = startOfMonth(today);

  const dataMap = new Map(data.map((item) => [item.date, item.minutes]));

  const todayMinutes = dataMap.get(todayKey) ?? 0;

  let weekMinutes = 0;

  let monthMinutes = 0;

  let totalMinutes = 0;

  data.forEach((item) => {
    const date = new Date(item.date);

    totalMinutes += item.minutes;

    if (date >= weekStart) {
      weekMinutes += item.minutes;
    }

    if (date >= monthStart) {
      monthMinutes += item.minutes;
    }
  });

  /**
   * Streaks
   */
  const sortedDates = [...data]
    .filter((d) => d.minutes > 0)
    .map((d) => d.date)
    .sort();

  let currentStreak = 0;

  let longestStreak = 0;

  let streak = 0;

  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      streak = 1;
    } else {
      const prev = new Date(sortedDates[i - 1]);

      const curr = new Date(sortedDates[i]);

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
   * Current streak
   */
  for (let i = sortedDates.length - 1; i >= 0; i--) {
    const curr = new Date(sortedDates[i]);

    const diff = differenceInCalendarDays(today, curr);

    if (diff === currentStreak || diff === currentStreak + 1) {
      currentStreak++;
    } else {
      break;
    }
  }

  return {
    todayMinutes,
    weekMinutes,
    monthMinutes,
    totalMinutes,
    currentStreak,
    longestStreak,
  };
}
