import type { WeeklyMission } from '../utils/weekly-missions';

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
            Complete missions to gain bonus XP.
          </p>
        </div>

        <div className="text-4xl">🏆</div>
      </div>

      <div className="space-y-4">
        {missions.map((mission) => {
          const progress = (mission.progress / mission.target) * 100;

          return (
            <div
              key={mission.id}
              className="
                rounded-2xl
                bg-white/[0.03]
                border
                border-white/5
                p-5
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="font-semibold">{mission.title}</div>

                    {mission.completed && (
                      <div
                        className="
                          px-2
                          py-1
                          rounded-full
                          bg-green-500/20
                          text-green-400
                          text-xs
                          font-medium
                        "
                      >
                        COMPLETED
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-white/50 mt-2">
                    {mission.description}
                  </div>
                </div>

                <div
                  className="
                    px-3
                    py-2
                    rounded-xl
                    bg-fuchsia-500/10
                    text-fuchsia-300
                    text-sm
                    font-semibold
                    whitespace-nowrap
                  "
                >
                  +{mission.xpReward} XP
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between mb-2 text-sm">
                  <div className="text-white/50">Progress</div>

                  <div className="font-medium">
                    {Math.floor(mission.progress)}/{mission.target}
                  </div>
                </div>

                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`
                      h-full
                      rounded-full
                      transition-all
                      duration-700
                      ${
                        mission.completed
                          ? `
                            bg-gradient-to-r
                            from-green-400
                            to-emerald-300
                          `
                          : `
                            bg-gradient-to-r
                            from-fuchsia-500
                            to-cyan-400
                          `
                      }
                    `}
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
