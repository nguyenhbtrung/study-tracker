import { useEffect, useState } from 'react';

export function useTracker() {
  const [stats, setStats] = useState({ today: 0, total: 0 });

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await (window as any).api.tracker.getStats();
      setStats(data);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}
