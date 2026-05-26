type Props = {
  title: string;

  value: string;

  description: string;
};

export function RankingOverviewCard({ title, value, description }: Props) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/5
        bg-[#151526]
        p-6
      "
    >
      <div className="text-sm text-white/50">{title}</div>

      <div className="mt-4 text-4xl font-black">{value}</div>

      <div className="mt-3 text-sm text-white/40 leading-relaxed">
        {description}
      </div>
    </div>
  );
}
