import {
  ContributionGraph,
  ProductivityHeatmap,
  StatisticsCard,
  StudyTrendChart,
  calculateStatistics,
} from '../../features/statistics';

const mockData = [
  {
    date: '2026-05-01',
    minutes: 120,
    sessions: 2,
    focusScore: 72,
  },
  {
    date: '2026-05-02',
    minutes: 240,
    sessions: 4,
    focusScore: 88,
  },
  {
    date: '2026-05-03',
    minutes: 60,
    sessions: 1,
    focusScore: 45,
  },
  {
    date: '2026-05-04',
    minutes: 240,
    sessions: 4,
    focusScore: 90,
  },
  {
    date: '2026-05-10',
    minutes: 60,
    sessions: 2,
    focusScore: 30,
  },
  {
    date: '2026-05-11',
    minutes: 180,
    sessions: 3,
    focusScore: 75,
  },
];

const productivityData = [
  { hour: 0, minutes: 0 },
  { hour: 1, minutes: 0 },
  { hour: 2, minutes: 0 },
  { hour: 8, minutes: 20 },
  { hour: 9, minutes: 45 },
  { hour: 10, minutes: 60 },
  { hour: 14, minutes: 80 },
  { hour: 20, minutes: 180 },
  { hour: 21, minutes: 220 },
  { hour: 22, minutes: 140 },
];

function formatHours(minutes: number) {
  return `${(minutes / 60).toFixed(1)}h`;
}

export function StatisticsPage() {
  const stats = calculateStatistics(mockData);

  return (
    <div className="p-6 space-y-6">
      {/* Summary */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-4
        "
      >
        <StatisticsCard title="Today" value={formatHours(stats.todayMinutes)} />

        <StatisticsCard
          title="This Week"
          value={formatHours(stats.weekMinutes)}
        />

        <StatisticsCard
          title="This Month"
          value={formatHours(stats.monthMinutes)}
        />

        <StatisticsCard title="Total" value={formatHours(stats.totalMinutes)} />

        <StatisticsCard
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          subtitle="Keep going 🔥"
        />

        <StatisticsCard
          title="Longest Streak"
          value={`${stats.longestStreak} days`}
        />
      </div>

      <ContributionGraph data={mockData} />

      <StudyTrendChart data={mockData} />

      <ProductivityHeatmap data={productivityData} />
    </div>
  );
}
