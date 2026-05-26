import type { RankTier } from '../utils/rank-config';

type Props = {
  rank: RankTier;
};

export function RankBadge({ rank }: Props) {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-3xl
        p-[1px]
        bg-gradient-to-br
        ${rank.color}
      `}
    >
      <div
        className="
          bg-[#0f0f1a]
          rounded-3xl
          px-10
          py-8
          flex
          flex-col
          items-center
          justify-center
          min-h-[260px]
        "
      >
        <div
          className={`
            w-28
            h-28
            rounded-full
            bg-gradient-to-br
            ${rank.color}
            flex
            items-center
            justify-center
            text-5xl
            shadow-2xl
            ${rank.glow}
          `}
        >
          {rank.icon}
        </div>

        <div className="mt-6 text-sm uppercase tracking-[0.4em] text-white/50">
          Current Rank
        </div>

        <div className="mt-2 text-4xl font-black">{rank.name}</div>
      </div>
    </div>
  );
}
