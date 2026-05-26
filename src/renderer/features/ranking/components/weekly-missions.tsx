import type { WeeklyMission } from '../types';

type Props = {
  missions: WeeklyMission[];
};

export function WeeklyMissions({ missions }: Props) {
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Weekly Missions</h2>

          <p className="text-sm text-white/50 mt-1">
            Complete missions to gain more XP.
          </p>
        </div>

        <div className="text-3xl">🎯</div>
      </div>

      <div className="space-y-4">
        {missions.map((mission) => {
          const progress = (mission.progress / mission.target) * 100;

          return (
            <div
              key={mission.title}
              className="
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/5
                p-4
              "
            >
              <div className="flex items-center justify-between mb-3">
                <div className="font-medium">{mission.title}</div>

                <div className="text-sm text-white/50">
                  {mission.progress}/{mission.target}
                </div>
              </div>

              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-emerald-400
                    to-cyan-400
                  "
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
