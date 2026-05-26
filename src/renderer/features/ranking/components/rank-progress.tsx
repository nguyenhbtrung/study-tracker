import type { RankTier } from '../utils/rank-config';

type Props = {
  progress: number;

  currentXp: number;

  nextRank: RankTier;
};

export function RankProgress({ progress, currentXp, nextRank }: Props) {
  return (
    <div
      className="
        bg-[#151526]
        rounded-3xl
        border
        border-white/5
        p-6
      "
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-sm text-white/50">Rank Progress</div>

          <div className="text-xl font-bold mt-1">
            {currentXp.toLocaleString()} XP
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-white/40">Next Rank</div>

          <div className="font-semibold mt-1">{nextRank.name}</div>
        </div>
      </div>

      <div className="h-5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-fuchsia-500
            via-violet-500
            to-cyan-400
            transition-all
            duration-700
          "
          style={{
            width: `${Math.min(progress, 100)}%`,
          }}
        />
      </div>

      <div className="mt-3 text-sm text-white/50">
        {progress.toFixed(0)}% completed
      </div>
    </div>
  );
}
