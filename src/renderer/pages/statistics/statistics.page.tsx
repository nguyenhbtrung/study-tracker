import { useEffect, useMemo, useState } from 'react';

import {
  ContributionGraph,
  ProductivityHeatmap,
  StatisticsCard,
  StudyTrendChart,
  calculateStatistics,
} from '../../features/statistics';

type StatisticsResponse = Awaited<
  ReturnType<typeof window.api.tracker.getStatistics>
>;

export function StatisticsPage() {
  const [data, setData] = useState<StatisticsResponse | null>(null);

  useEffect(() => {
    window.api.tracker.getStatistics().then(setData);
  }, []);

  const summary = useMemo(() => {
    if (!data) {
      return null;
    }

    return calculateStatistics(data.contributionData);
  }, [data]);

  if (!data || !summary) {
    return <div className="p-6 text-white/60">Loading statistics...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Summary */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
        "
      >
        <StatisticsCard
          title="Today"
          value={`${(summary.todayMinutes / 60).toFixed(1)}h`}
        />

        <StatisticsCard
          title="This Week"
          value={`${(summary.weekMinutes / 60).toFixed(1)}h`}
        />

        <StatisticsCard
          title="This Month"
          value={`${(summary.monthMinutes / 60).toFixed(1)}h`}
        />

        <StatisticsCard
          title="Total Study"
          value={`${(summary.totalMinutes / 60).toFixed(1)}h`}
        />

        <StatisticsCard
          title="Current Streak"
          value={`${summary.currentStreak} days`}
        />

        <StatisticsCard
          title="Longest Streak"
          value={`${summary.longestStreak} days`}
        />
      </div>

      {/* Trend */}
      <StudyTrendChart data={data.trendData} />

      {/* Heatmap */}
      <ProductivityHeatmap data={data.productivityData} />

      {/* Contributions */}
      <ContributionGraph
        data={data.contributionData}
        sessionsByDate={data.sessionsByDate}
      />
    </div>
  );
}
