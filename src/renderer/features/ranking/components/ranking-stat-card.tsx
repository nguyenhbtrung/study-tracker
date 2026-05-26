type Props = {
  title: string;

  value: string;

  icon: string;
};

export function RankingStatCard({ title, value, icon }: Props) {
  return (
    <div
      className="
        bg-[#151526]
        rounded-3xl
        border
        border-white/5
        p-5
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/50">{title}</div>

          <div className="text-3xl font-black mt-3">{value}</div>
        </div>

        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}
