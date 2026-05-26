export type RankTier = {
  name: string;

  minXp: number;

  color: string;

  glow: string;

  icon: string;
};

export const RANK_TIERS: RankTier[] = [
  {
    name: 'Iron',
    minXp: 0,
    color: 'from-zinc-500 to-zinc-700',
    glow: 'shadow-zinc-500/30',
    icon: '⚒️',
  },
  {
    name: 'Bronze',
    minXp: 1000,
    color: 'from-amber-600 to-orange-700',
    glow: 'shadow-orange-500/30',
    icon: '🛡️',
  },
  {
    name: 'Silver',
    minXp: 2500,
    color: 'from-slate-300 to-slate-500',
    glow: 'shadow-slate-300/30',
    icon: '⚔️',
  },
  {
    name: 'Gold',
    minXp: 5000,
    color: 'from-yellow-300 to-yellow-600',
    glow: 'shadow-yellow-400/30',
    icon: '👑',
  },
  {
    name: 'Platinum',
    minXp: 9000,
    color: 'from-cyan-300 to-cyan-600',
    glow: 'shadow-cyan-400/30',
    icon: '💎',
  },
  {
    name: 'Diamond',
    minXp: 14000,
    color: 'from-violet-400 to-fuchsia-600',
    glow: 'shadow-fuchsia-500/30',
    icon: '🔮',
  },
  {
    name: 'Master',
    minXp: 22000,
    color: 'from-rose-400 to-red-600',
    glow: 'shadow-red-500/40',
    icon: '🔥',
  },
  {
    name: 'Grandmaster',
    minXp: 32000,
    color: 'from-indigo-300 via-fuchsia-400 to-pink-500',
    glow: 'shadow-pink-500/40',
    icon: '🌌',
  },
];
