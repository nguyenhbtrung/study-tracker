import { useEffect, useState } from 'react';
import { StatsResponse } from '@shared/types/tracker.types';

export function useTracker() {
  const [stats, setStats] = useState<StatsResponse>({ today: 0, total: 0 });

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await window.api.tracker.getStats();
      setStats(data);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}
