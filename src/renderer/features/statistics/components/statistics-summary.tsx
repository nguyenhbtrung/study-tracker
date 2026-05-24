type Props = {
  title: string;
  value: string;
  subtitle?: string;
};

export function StatisticsCard({ title, value, subtitle }: Props) {
  return (
    <div
      className="
        bg-[#151526]
        border border-white/5
        rounded-2xl
        p-5
      "
    >
      <div className="text-sm text-white/50">{title}</div>

      <div className="text-3xl font-bold mt-2">{value}</div>

      {subtitle && <div className="text-xs text-white/40 mt-2">{subtitle}</div>}
    </div>
  );
}
