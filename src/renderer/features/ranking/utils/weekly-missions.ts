import type { StudySession } from '../../statistics';

export type WeeklyMission = {
  id: string;

  title: string;

  description: string;

  xpReward: number;

  target: number;

  progress: number;

  completed: boolean;
};

export function buildWeeklyMissions(sessions: StudySession[]): WeeklyMission[] {
  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  const totalHours = totalMinutes / 60;

  const totalFocus = sessions.reduce((sum, s) => sum + (s.focusScore ?? 70), 0);

  const averageFocus = sessions.length > 0 ? totalFocus / sessions.length : 0;

  const longSessions = sessions.filter((s) => s.durationMinutes >= 120).length;

  const missions: WeeklyMission[] = [
    {
      id: 'study-hours',
      title: 'Study 20 Hours',
      description: 'Reach 20 hours of study this week.',
      xpReward: 500,
      target: 20,
      progress: totalHours,
      completed: totalHours >= 20,
    },

    {
      id: 'focus-master',
      title: 'Focus Master',
      description: 'Maintain focus score above 85.',
      xpReward: 700,
      target: 85,
      progress: averageFocus,
      completed: averageFocus >= 85,
    },

    {
      id: 'long-session',
      title: 'Deep Work',
      description: 'Complete 5 long study sessions.',
      xpReward: 450,
      target: 5,
      progress: longSessions,
      completed: longSessions >= 5,
    },

    {
      id: 'active-user',
      title: 'Active Learner',
      description: 'Complete 25 study sessions.',
      xpReward: 600,
      target: 25,
      progress: sessions.length,
      completed: sessions.length >= 25,
    },
  ];

  return missions;
}

export function calculateMissionXp(missions: WeeklyMission[]) {
  return missions
    .filter((m) => m.completed)
    .reduce((sum, m) => sum + m.xpReward, 0);
}
