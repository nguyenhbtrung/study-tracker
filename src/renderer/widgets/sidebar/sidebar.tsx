import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  Settings,
  Trophy,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div
      className="
        w-64
        bg-[#11111d]
        border-r
        border-white/5
        flex
        flex-col
        p-3
        gap-1
        relative
        overflow-hidden
      "
    >
      {/* Background glow */}
      <div
        className="
          absolute
          top-[-120px]
          right-[-120px]
          w-72
          h-72
          rounded-full
          bg-fuchsia-500/10
          blur-3xl
          pointer-events-none
        "
      />

      {/* Logo */}
      <div
        className="
          px-3
          py-5
          mb-2
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            w-10
            h-10
            rounded-2xl
            bg-gradient-to-br
            from-fuchsia-500
            via-violet-500
            to-cyan-400
            flex
            items-center
            justify-center
            text-black
            font-black
            shadow-lg
            shadow-fuchsia-500/30
          "
        >
          ST
        </div>

        <div>
          <div className="font-bold text-sm">Study Tracker</div>

          <div className="text-[11px] text-white/40">Productivity System</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-1">
        <NavItem
          to="/"
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
        />

        <NavItem to="/tasks" icon={<CheckSquare size={18} />} label="Tasks" />

        <NavItem
          to="/statistics"
          icon={<BarChart3 size={18} />}
          label="Statistics"
        />

        <NavItem
          to="/ranking"
          icon={<Trophy size={18} />}
          label="Ranking"
          glow
        />

        <NavItem
          to="/settings"
          icon={<Settings size={18} />}
          label="Settings"
        />
      </div>

      {/* Bottom card */}
      <div className="mt-auto pt-4">
        <div
          className="
            rounded-3xl
            border
            border-fuchsia-500/20
            bg-gradient-to-br
            from-fuchsia-500/10
            via-violet-500/10
            to-cyan-500/10
            p-4
            backdrop-blur-xl
          "
        >
          <div className="text-xs uppercase tracking-[0.25em] text-fuchsia-300/70">
            Current Goal
          </div>

          <div className="mt-3 text-lg font-bold">Reach Diamond Rank</div>

          <div className="mt-2 text-sm text-white/50 leading-relaxed">
            Maintain your streak and improve focus score to level up faster.
          </div>

          <div
            className="
              mt-4
              h-2
              rounded-full
              bg-white/5
              overflow-hidden
            "
          >
            <div
              className="
                h-full
                w-[62%]
                rounded-full
                bg-gradient-to-r
                from-fuchsia-500
                to-cyan-400
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type NavItemProps = {
  to: string;

  icon: React.ReactNode;

  label: string;

  glow?: boolean;
};

function NavItem({ to, icon, label, glow }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `
        group
        relative
        overflow-hidden
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-2xl
        cursor-pointer
        text-sm
        transition-all
        duration-300
        border
        ${
          isActive
            ? `
              bg-gradient-to-r
              from-fuchsia-500/20
              to-cyan-500/10
              border-fuchsia-500/20
              text-white
              shadow-lg
              shadow-fuchsia-500/10
            `
            : `
              border-transparent
              text-white/60
              hover:text-white
              hover:bg-white/[0.03]
            `
        }
      `
      }
    >
      {/* Hover glow */}
      {glow && (
        <div
          className="
            absolute
            inset-0
            opacity-0
            group-hover:opacity-100
            transition
            bg-gradient-to-r
            from-fuchsia-500/10
            to-cyan-500/10
          "
        />
      )}

      {/* Icon */}
      <div
        className={`
          relative
          z-10
          transition-transform
          duration-300
          group-hover:scale-110
        `}
      >
        {icon}
      </div>

      {/* Label */}
      <span className="relative z-10 font-medium">{label}</span>

      {/* Active indicator */}
      <div
        className={`
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          w-1
          h-8
          rounded-r-full
          transition
          ${
            to === '/ranking'
              ? 'bg-gradient-to-b from-fuchsia-500 to-cyan-400'
              : 'bg-white'
          }
        `}
      />
    </NavLink>
  );
}
