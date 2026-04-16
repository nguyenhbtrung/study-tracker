import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
} from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-56 bg-[#151526] border-r border-white/5 flex flex-col p-2 gap-1">
      <div className="p-3 text-sm font-semibold opacity-70">ST</div>

      <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
      <NavItem icon={<CheckSquare size={18} />} label="Tasks" />
      <NavItem icon={<BarChart3 size={18} />} label="Statistics" />
      <NavItem icon={<Settings size={18} />} label="Settings" />
    </div>
  );
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition
        ${active ? 'bg-white/10' : 'hover:bg-white/5'}`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
