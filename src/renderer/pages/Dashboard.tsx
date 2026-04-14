import { useEffect, useState } from 'react';

function format(ms: number) {
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h}h ${m}m ${s}s`;
}

export default function Dashboard() {
  const [stats, setStats] = useState({ today: 0, total: 0 });

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await (window as any).api.getStats();
      setStats(data);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="content-inner">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          <p>Today</p>
          <h2>{format(stats.today)}</h2>
        </div>

        <div className="card">
          <p>Total</p>
          <h2>{format(stats.total)}</h2>
        </div>
      </div>
    </div>
  );
}
