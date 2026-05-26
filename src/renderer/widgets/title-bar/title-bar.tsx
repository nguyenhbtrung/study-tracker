import { Minus, Square, X } from 'lucide-react';

export default function TitleBar() {
  return (
    <div className="h-10 flex items-center justify-between bg-[#141423] border-b border-white/10">
      {/* Drag */}
      <div
        className="flex-1 pl-3 text-sm opacity-80 select-none"
        style={{ WebkitAppRegion: 'drag' } as any}
      >
        Study Tracker
      </div>

      {/* Controls */}
      <div className="flex">
        <button
          onClick={() => (window as any).api.window.minimize()}
          className="w-11 h-10 flex items-center justify-center hover:bg-white/10"
          style={{ WebkitAppRegion: 'no-drag' } as any}
        >
          <Minus size={16} />
        </button>

        <button
          onClick={() => (window as any).api.window.maximize()}
          className="w-11 h-10 flex items-center justify-center hover:bg-white/10"
          style={{ WebkitAppRegion: 'no-drag' } as any}
        >
          <Square size={14} />
        </button>

        <button
          onClick={() => (window as any).api.window.close()}
          className="w-11 h-10 flex items-center justify-center hover:bg-red-600"
          style={{ WebkitAppRegion: 'no-drag' } as any}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
