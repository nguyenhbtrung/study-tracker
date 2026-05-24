import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts';

import { format, subDays, isAfter } from 'date-fns';

import { useMemo, useState } from 'react';

type TrendData = {
  date: string;
  minutes: number;
  sessions: number;
  focusScore: number;
};

type Props = {
  data: TrendData[];
};

type Metric = 'hours' | 'sessions' | 'focusScore';

type Range = 7 | 30 | 90 | 365;

export function StudyTrendChart({ data }: Props) {
  const [metric, setMetric] = useState<Metric>('hours');

  const [range, setRange] = useState<Range>(30);

  /**
   * Filter by range
   */
  const filteredData = useMemo(() => {
    const from = subDays(new Date(), range);

    return data.filter((item) => isAfter(new Date(item.date), from));
  }, [data, range]);

  /**
   * Transform chart data
   */
  const chartData = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,

      hours: Number((item.minutes / 60).toFixed(1)),

      label: format(new Date(item.date), 'MMM d'),
    }));
  }, [filteredData]);

  /**
   * Average
   */
  const average = useMemo(() => {
    if (!chartData.length) {
      return 0;
    }

    const total = chartData.reduce(
      (sum, item) =>
        sum +
        (metric === 'hours'
          ? item.hours
          : metric === 'sessions'
            ? item.sessions
            : item.focusScore),
      0,
    );

    return Number((total / chartData.length).toFixed(1));
  }, [chartData, metric]);

  return (
    <div
      className="
        bg-[#151526]
        border border-white/5
        rounded-2xl
        p-5
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
          mb-6
        "
      >
        <div>
          <h2 className="text-lg font-semibold">Study Trend</h2>

          <p className="text-sm text-white/50 mt-1">Study activity over time</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Metric filter */}
          <div
            className="
              flex
              bg-white/5
              rounded-lg
              p-1
            "
          >
            <FilterButton
              active={metric === 'hours'}
              onClick={() => setMetric('hours')}
            >
              Hours
            </FilterButton>

            <FilterButton
              active={metric === 'sessions'}
              onClick={() => setMetric('sessions')}
            >
              Sessions
            </FilterButton>

            <FilterButton
              active={metric === 'focusScore'}
              onClick={() => setMetric('focusScore')}
            >
              Focus
            </FilterButton>
          </div>

          {/* Range filter */}
          <div
            className="
              flex
              bg-white/5
              rounded-lg
              p-1
            "
          >
            {[7, 30, 90, 365].map((value) => (
              <FilterButton
                key={value}
                active={range === value}
                onClick={() => setRange(value as Range)}
              >
                {value === 365 ? '1Y' : `${value}D`}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>

      {/* Average */}
      <div className="mb-4 text-sm text-white/60">
        Average:{' '}
        <span className="text-white font-medium">
          {average}
          {metric === 'hours' ? 'h' : ''}
        </span>{' '}
        per day
      </div>

      {/* Chart */}
      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />

                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />

            <XAxis
              dataKey="label"
              tick={{
                fill: 'rgba(255,255,255,0.5)',
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: 'rgba(255,255,255,0.5)',
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
              width={40}
            />

            {/* Average line */}
            <ReferenceLine
              y={average}
              stroke="rgba(255,255,255,0.3)"
              strokeDasharray="4 4"
              label={{
                value: 'Average',
                fill: 'rgba(255,255,255,0.5)',
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                background: '#0f0f1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
              }}
              formatter={(value) => [
                metric === 'hours'
                  ? `${value}h studied`
                  : metric === 'sessions'
                    ? `${value} sessions`
                    : `Focus score: ${value}`,
                metric === 'hours'
                  ? 'Study Time'
                  : metric === 'sessions'
                    ? 'Sessions'
                    : 'Focus Score',
              ]}
              labelStyle={{
                color: 'rgba(255,255,255,0.5)',
              }}
            />

            <Area
              type="monotone"
              dataKey={
                metric === 'hours'
                  ? 'hours'
                  : metric === 'sessions'
                    ? 'sessions'
                    : 'focusScore'
              }
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#studyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

type FilterButtonProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

function FilterButton({ active, children, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3
        py-1.5
        text-sm
        rounded-md
        transition
        ${active ? 'bg-green-500 text-black' : 'text-white/60 hover:text-white'}
      `}
    >
      {children}
    </button>
  );
}
