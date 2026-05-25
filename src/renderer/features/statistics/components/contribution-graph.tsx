import {
  eachDayOfInterval,
  endOfYear,
  format,
  getDay,
  startOfYear,
  differenceInCalendarWeeks,
} from 'date-fns';

import { useMemo, useState } from 'react';

import { ContributionCell } from './contribution-cell';
import { ContributionDayModal } from './contribution-day-modal';
import { StudySession } from '../types';

type ContributionData = {
  date: string;
  minutes: number;
};

type Props = {
  data: ContributionData[];

  sessionsByDate: Record<string, StudySession[]>;
};

const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export function ContributionGraph({ data, sessionsByDate }: Props) {
  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const startDate = startOfYear(new Date(selectedYear, 0, 1));

  const endDate = endOfYear(new Date(selectedYear, 0, 1));

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
  }, [startDate, endDate]);

  const dataMap = useMemo(() => {
    return new Map(data.map((item) => [item.date, item.minutes]));
  }, [data]);

  /**
   * Month labels
   */
  const monthLabels = useMemo(() => {
    const labels: {
      month: string;
      column: number;
    }[] = [];

    let previousMonth = -1;

    days.forEach((day) => {
      const month = day.getMonth();

      if (month !== previousMonth) {
        previousMonth = month;

        const weekIndex = differenceInCalendarWeeks(day, startDate);

        labels.push({
          month: format(day, 'MMM'),
          column: weekIndex,
        });
      }
    });

    return labels;
  }, [days, startDate]);

  return (
    <div className="bg-[#151526] rounded-2xl p-5 border border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Study Contributions</h2>

          <p className="text-sm text-white/50 mt-1">Daily study tracking</p>
        </div>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="
            bg-[#1d1d35]
            border border-white/10
            rounded-lg
            px-3 py-2
            text-sm
            outline-none
          "
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const year = currentYear - i;

            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month labels */}
          <div className="flex ml-8 mb-2 relative h-4">
            {monthLabels.map((item) => (
              <div
                key={item.month}
                className="
                  absolute
                  text-[11px]
                  text-white/40
                "
                style={{
                  left: item.column * 18,
                }}
              >
                {item.month}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Weekday labels */}
            <div className="flex flex-col gap-1">
              {WEEKDAY_LABELS.map((label, index) => (
                <div
                  key={index}
                  className="
                    h-[14px]
                    text-[10px]
                    text-white/40
                    flex items-center
                  "
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div
              className="
                grid
                grid-flow-col
                grid-rows-7
                gap-1
              "
            >
              {days.map((day) => {
                const key = format(day, 'yyyy-MM-dd');

                const minutes = dataMap.get(key) ?? 0;

                /**
                 * Sunday = 0
                 * GitHub starts from Sunday row
                 */
                const row = getDay(day);

                return (
                  <div
                    key={key}
                    style={{
                      gridRowStart: row + 1,
                    }}
                  >
                    <ContributionCell
                      date={key}
                      minutes={minutes}
                      onClick={() => setSelectedDate(key)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs">
        <span>Less</span>

        <div className="w-3 h-3 rounded-sm bg-white/5" />
        <div className="w-3 h-3 rounded-sm bg-green-900" />
        <div className="w-3 h-3 rounded-sm bg-green-700" />
        <div className="w-3 h-3 rounded-sm bg-green-500" />
        <div className="w-3 h-3 rounded-sm bg-green-400" />

        <span>More</span>
      </div>
      <ContributionDayModal
        open={selectedDate != null}
        date={selectedDate ?? ''}
        sessions={selectedDate ? (sessionsByDate[selectedDate] ?? []) : []}
        onClose={() => setSelectedDate(null)}
      />
    </div>
  );
}
