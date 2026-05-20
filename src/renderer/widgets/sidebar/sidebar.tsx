import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-56 bg-[#151526] border-r border-white/5 flex flex-col p-2 gap-1">
      <div className="p-3 text-sm font-semibold opacity-70">ST</div>

      <NavItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />

      <NavItem to="/tasks" icon={<CheckSquare size={18} />} label="Tasks" />

      <NavItem
        to="/statistics"
        icon={<BarChart3 size={18} />}
        label="Statistics"
      />

      <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
    </div>
  );
}

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm transition
        ${
          isActive
            ? 'bg-white/10 text-white'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      {icon}

      <span>{label}</span>
    </NavLink>
  );
}
