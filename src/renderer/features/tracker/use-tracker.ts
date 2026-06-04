import { useEffect, useState } from 'react';
import { StatsResponse } from '@shared/types/tracker.types';

export function useTracker() {
  const [stats, setStats] = useState<StatsResponse>({
    currentSession: 0,
    today: 0,
    total: 0,
    isTracking: false,
    isPaused: false,
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await window.api.tracker.getStats();

      setStats(data);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pause = () => window.api.tracker.pause();

  const resume = () => window.api.tracker.resume();

  return {
    ...stats,
    pause,
    resume,
  };
}
