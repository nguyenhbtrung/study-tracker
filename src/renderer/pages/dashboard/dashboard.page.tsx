import { useTracker } from '../../features/tracker/use-tracker';

function format(ms: number) {
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h}h ${m}m ${s}s`;
}

export default function Dashboard() {
  const stats = useTracker();

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <Card title="Today" value={format(stats.today)} />
        <Card title="Total" value={format(stats.total)} />
      </div>
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:translate-y-[-4px] transition">
      <p className="text-sm opacity-70">{title}</p>
      <h2 className="text-2xl font-semibold mt-2">{value}</h2>
    </div>
  );
}
