import { useEffect, useMemo, useState } from 'react';

import {
  RankBadge,
  RankProgress,
  RankingOverviewCard,
  RankingStatCard,
  WeeklyMissions,
  calculateRank,
} from '../../features/ranking';

import type { StudySession } from '../../features/statistics';

type StatisticsResponse = Awaited<
  ReturnType<typeof window.api.tracker.getStatistics>
>;

export function RankingPage() {
  const [data, setData] = useState<StatisticsResponse | null>(null);

  useEffect(() => {
    window.api.tracker.getStatistics().then(setData);
  }, []);

  const sessions = useMemo<StudySession[]>(() => {
    if (!data) {
      return [];
    }

    return Object.values(data.sessionsByDate).flat();
  }, [data]);

  const ranking = useMemo(() => {
    return calculateRank(sessions);
  }, [sessions]);

  const weeklyMissions = [
    {
      title: 'Study 15 Hours',
      progress: Math.floor(ranking.totalHours % 15),
      target: 15,
    },
    {
      title: 'Reach Focus Score 90',
      progress: Math.floor(ranking.averageFocus),
      target: 90,
    },
    {
      title: 'Maintain 7 Day Streak',
      progress: ranking.longestStreak,
      target: 7,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-fuchsia-500/20
          bg-gradient-to-br
          from-[#17172b]
          via-[#111827]
          to-[#0b1120]
          p-8
        "
      >
        <div className="absolute inset-0 opacity-30">
          <div
            className="
              absolute
              -top-32
              -right-32
              w-96
              h-96
              rounded-full
              bg-fuchsia-500/30
              blur-3xl
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-0
              w-72
              h-72
              rounded-full
              bg-cyan-500/20
              blur-3xl
            "
          />
        </div>

        <div className="relative z-10 grid xl:grid-cols-[420px_1fr] gap-8">
          <RankBadge rank={ranking.currentRank} />

          <div className="space-y-6">
            <div>
              <div className="text-sm uppercase tracking-[0.4em] text-fuchsia-300/70">
                Study League
              </div>

              <h1 className="mt-4 text-5xl font-black leading-tight">
                Level Up Your
                <br />
                Study Discipline
              </h1>

              <p className="mt-5 text-white/60 max-w-2xl leading-relaxed">
                Your study performance is analyzed using focus score,
                consistency, total study time, and learning habits.
              </p>
            </div>

            <RankProgress
              progress={ranking.progress}
              currentXp={ranking.totalXp}
              nextRank={ranking.nextRank}
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
      >
        <RankingStatCard
          title="Total XP"
          value={ranking.totalXp.toLocaleString()}
          icon="⚡"
        />

        <RankingStatCard
          title="Study Hours"
          value={`${ranking.totalHours.toFixed(1)}h`}
          icon="📚"
        />

        <RankingStatCard
          title="Average Focus"
          value={`${ranking.averageFocus.toFixed(0)}`}
          icon="🎯"
        />

        <RankingStatCard
          title="Longest Streak"
          value={`${ranking.longestStreak}d`}
          icon="🔥"
        />
      </div>

      {/* OVERVIEW */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-4
        "
      >
        <RankingOverviewCard
          title="Performance"
          value="Elite"
          description="Your study consistency is above average and your focus score is improving steadily."
        />

        <RankingOverviewCard
          title="Learning Style"
          value="Focused"
          description="You tend to maintain longer sessions with stable concentration."
        />

        <RankingOverviewCard
          title="Discipline"
          value="High"
          description="Your streaks and daily activity show strong learning discipline."
        />
      </div>

      {/* MISSIONS */}
      <WeeklyMissions missions={weeklyMissions} />
    </div>
  );
}
