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
    return calculateRank(sessions, data?.daily ?? []);
  }, [sessions, data]);

  if (!data) {
    return <div className="p-6 text-white/60">Loading ranking...</div>;
  }

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
        {/* Background glow */}
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

        <div
          className="
            relative
            z-10
            grid
            xl:grid-cols-[420px_1fr]
            gap-8
          "
        >
          <RankBadge rank={ranking.currentRank} />

          <div className="space-y-6">
            <div>
              <div
                className="
                  text-sm
                  uppercase
                  tracking-[0.4em]
                  text-fuchsia-300/70
                "
              >
                Study League
              </div>

              <h1
                className="
                  mt-4
                  text-5xl
                  font-black
                  leading-tight
                "
              >
                Level Up Your
                <br />
                Study Discipline
              </h1>

              <p
                className="
                  mt-5
                  text-white/60
                  max-w-2xl
                  leading-relaxed
                "
              >
                Your study performance is analyzed using focus score,
                consistency, total study time, mission completion, and learning
                habits.
              </p>
            </div>

            <RankProgress
              progress={ranking.progress}
              currentXp={ranking.totalXp}
              nextRank={ranking.nextRank}
            />

            {/* XP Breakdown */}
            <div
              className="
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-4
              "
            >
              <div
                className="
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/5
                  p-4
                "
              >
                <div className="text-xs text-white/40">Mission XP</div>

                <div className="mt-2 text-2xl font-bold text-green-400">
                  +{ranking.missionXp}
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/5
                  p-4
                "
              >
                <div className="text-xs text-white/40">Consistency Bonus</div>

                <div className="mt-2 text-2xl font-bold text-cyan-400">
                  +{ranking.bonuses.consistencyBonus}
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/5
                  p-4
                "
              >
                <div className="text-xs text-white/40">Marathon Bonus</div>

                <div className="mt-2 text-2xl font-bold text-fuchsia-400">
                  +{ranking.bonuses.marathonBonus}
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-white/[0.03]
                  border
                  border-white/5
                  p-4
                "
              >
                <div className="text-xs text-white/40">Total Penalties</div>

                <div className="mt-2 text-2xl font-bold text-red-400">
                  -
                  {(
                    ranking.penalties.lowFocusPenalty +
                    ranking.penalties.spamPenalty +
                    ranking.penalties.inactiveDaysPenalty +
                    ranking.penalties.afkPenalty
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN STATS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-5
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
          title="Current Streak"
          value={`${ranking.currentStreak}d`}
          icon="🔥"
        />

        <RankingStatCard
          title="Mission XP"
          value={`+${ranking.missionXp}`}
          icon="🏆"
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
          value={
            ranking.averageFocus >= 85
              ? 'Elite'
              : ranking.averageFocus >= 70
                ? 'Advanced'
                : 'Improving'
          }
          description="
            Your study quality is determined
            by consistency, focus score,
            streaks, and session efficiency.
          "
        />

        <RankingOverviewCard
          title="Learning Style"
          value={
            ranking.totalHours >= 200
              ? 'Deep Worker'
              : ranking.totalHours >= 80
                ? 'Focused'
                : 'Explorer'
          }
          description="
            Your learning style evolves based
            on long sessions and productivity
            patterns.
          "
        />

        <RankingOverviewCard
          title="Discipline"
          value={
            ranking.currentStreak >= 30
              ? 'Legendary'
              : ranking.currentStreak >= 14
                ? 'High'
                : 'Moderate'
          }
          description="
            Streaks and consistent learning
            strongly impact your progression.
          "
        />
      </div>

      {/* PENALTIES */}
      <div
        className="
          bg-[#151526]
          rounded-3xl
          border
          border-red-500/10
          p-6
        "
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">⚠️</div>

          <div>
            <h2 className="text-xl font-bold">Penalty System</h2>

            <p className="text-sm text-white/50 mt-1">
              Bad study habits reduce your XP.
            </p>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          <PenaltyCard
            title="Low Focus"
            value={ranking.penalties.lowFocusPenalty}
          />

          <PenaltyCard
            title="Session Spam"
            value={ranking.penalties.spamPenalty}
          />

          <PenaltyCard
            title="Inactive Days"
            value={ranking.penalties.inactiveDaysPenalty}
          />

          <PenaltyCard
            title="AFK Detection"
            value={ranking.penalties.afkPenalty}
          />
        </div>
      </div>

      {/* MISSIONS */}
      <WeeklyMissions missions={ranking.weeklyMissions} />
    </div>
  );
}

type PenaltyCardProps = {
  title: string;

  value: number;
};

function PenaltyCard({ title, value }: PenaltyCardProps) {
  return (
    <div
      className="
        rounded-2xl
        bg-red-500/5
        border
        border-red-500/10
        p-5
      "
    >
      <div className="text-sm text-white/50">{title}</div>

      <div className="mt-3 text-3xl font-black text-red-400">-{value}</div>
    </div>
  );
}
