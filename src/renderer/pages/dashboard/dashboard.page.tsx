import { Pause, Play, Timer } from 'lucide-react';

import { useTracker } from '../../features/tracker';

function format(ms: number) {
  const sec = Math.floor(ms / 1000);

  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  return `${h}h ${m}m ${s}s`;
}

export function DashboardPage() {
  const tracker = useTracker();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-white/40">
          Track your focus. Build consistency.
        </p>
      </div>

      {/* Hero */}
      <CurrentSessionCard tracker={tracker} />

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2">
        <StatCard title="Today" value={format(tracker.today)} />

        <StatCard title="Total" value={format(tracker.total)} />
      </div>
    </div>
  );
}

function CurrentSessionCard({ tracker }: any) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-8
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-fuchsia-500/10
          via-violet-500/5
          to-cyan-500/10
          pointer-events-none
        "
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-fuchsia-300">
          <Timer size={18} />

          <span className="text-sm uppercase tracking-[0.2em]">
            Current Session
          </span>
        </div>

        <div
          className="
            mt-8
            text-center
            text-6xl
            font-black
            tracking-tight
            bg-gradient-to-r
            from-fuchsia-400
            via-violet-300
            to-cyan-300
            bg-clip-text
            text-transparent
          "
        >
          {format(tracker.currentSession)}
        </div>

        <div className="mt-6 flex justify-center">
          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              px-4
              py-2
            "
          >
            <div
              className={`
                h-2
                w-2
                rounded-full
                ${
                  tracker.isPaused
                    ? 'bg-yellow-400'
                    : 'bg-cyan-400 animate-pulse'
                }
              `}
            />

            <span className="text-sm text-white/70">
              {tracker.isPaused ? 'Paused' : 'Studying'}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          {tracker.isPaused ? (
            <button
              onClick={tracker.resume}
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                px-6
                py-3
                font-medium
                text-black
                bg-gradient-to-r
                from-cyan-400
                to-fuchsia-400
                hover:scale-[1.03]
                transition
                shadow-lg
                shadow-fuchsia-500/30
              "
            >
              <Play size={18} />
              Resume
            </button>
          ) : (
            <button
              onClick={tracker.pause}
              className="
                flex
                items-center
                gap-2
                rounded-2xl
                px-6
                py-3
                font-medium
                text-black
                bg-gradient-to-r
                from-fuchsia-500
                to-cyan-400
                hover:scale-[1.03]
                transition
                shadow-lg
                shadow-fuchsia-500/30
              "
            >
              <Pause size={18} />
              Pause
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6
        transition-all
        duration-300
        hover:border-fuchsia-500/20
      "
    >
      <div className="text-sm text-white/40">{title}</div>

      <div className="mt-3 text-3xl font-bold text-white">{value}</div>

      <div
        className="
          mt-4
          h-1
          rounded-full
          bg-gradient-to-r
          from-fuchsia-500
          via-violet-500
          to-cyan-400
        "
      />
    </div>
  );
}
