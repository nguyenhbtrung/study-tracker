type ProductivityData = {
  hour: number;
  minutes: number;
};

type Props = {
  data: ProductivityData[];
};

export function ProductivityHeatmap({ data }: Props) {
  function getLevel(minutes: number) {
    if (minutes === 0) {
      return 'bg-white/5';
    }

    if (minutes < 30) {
      return 'bg-green-900';
    }

    if (minutes < 60) {
      return 'bg-green-700';
    }

    if (minutes < 120) {
      return 'bg-green-500';
    }

    return 'bg-green-400';
  }

  const bestHour = [...data].sort((a, b) => b.minutes - a.minutes)[0];

  return (
    <div
      className="
        bg-[#151526]
        border border-white/5
        rounded-2xl
        p-5
      "
    >
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Productivity by Hour</h2>

        <p className="text-sm text-white/50 mt-1">
          Discover your best study time
        </p>
      </div>

      <div className="mb-5 text-sm">
        Most productive hour:{' '}
        <span className="font-medium text-green-400">
          {bestHour.hour.toString().padStart(2, '0')}
          :00
        </span>
      </div>

      <div
        className="
          grid
          grid-cols-6
          md:grid-cols-8
          lg:grid-cols-12
          gap-2
        "
      >
        {data.map((item) => (
          <div
            key={item.hour}
            className="
              flex
              flex-col
              items-center
              gap-2
            "
          >
            <div
              className={`
                w-full
                h-10
                rounded-lg
                transition
                hover:scale-105
                ${getLevel(item.minutes)}
              `}
              title={`
${item.hour.toString().padStart(2, '0')}:00
${item.minutes} minutes
`}
            />

            <div className="text-xs text-white/50">{item.hour}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
