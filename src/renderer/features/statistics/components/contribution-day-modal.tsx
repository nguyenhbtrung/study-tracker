import { format } from 'date-fns';

import type { StudySession } from '../types';

type Props = {
  open: boolean;

  date: string;

  sessions: StudySession[];

  onClose: () => void;
};

export function ContributionDayModal({ open, date, sessions, onClose }: Props) {
  if (!open) {
    return null;
  }

  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-2xl
          bg-[#151526]
          border border-white/10
          rounded-3xl
          p-6
          max-h-[80vh]
          overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {format(new Date(date), 'EEEE, MMM d, yyyy')}
            </h2>

            <p className="text-sm text-white/50 mt-1">
              {sessions.length} sessions · {(totalMinutes / 60).toFixed(1)}h
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-9
              h-9
              rounded-xl
              bg-white/5
              hover:bg-white/10
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* Sessions */}
        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="
                p-4
                rounded-2xl
                bg-white/5
                border border-white/5
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{session.title}</div>

                  <div className="text-sm text-white/50 mt-1">
                    {format(new Date(session.startTime), 'HH:mm')}
                    {' - '}
                    {format(new Date(session.endTime), 'HH:mm')}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-medium">
                    {session.durationMinutes}m
                  </div>

                  {session.focusScore != null && (
                    <div
                      className="
                        text-xs
                        text-green-400
                        mt-1
                      "
                    >
                      Focus {session.focusScore}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!sessions.length && (
          <div
            className="
              text-center
              py-12
              text-white/40
            "
          >
            No study sessions
          </div>
        )}
      </div>
    </div>
  );
}
