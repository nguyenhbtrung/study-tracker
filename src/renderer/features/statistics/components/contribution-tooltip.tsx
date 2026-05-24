import { useEffect, useRef, useState } from 'react';

import { createPortal } from 'react-dom';

import { format } from 'date-fns';

type Props = {
  children: React.ReactNode;
  date: string;
  minutes: number;
};

export function ContributionTooltip({ children, date, minutes }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!visible || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();

    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  }, [visible]);

  return (
    <>
      <div
        ref={ref}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            className="
              fixed
              z-[9999]
              pointer-events-none
            "
            style={{
              left: position.x,
              top: position.y - 10,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div
              className="
                bg-[#0f0f1a]
                border
                border-white/10
                rounded-lg
                px-3
                py-2
                shadow-2xl
                whitespace-nowrap
                backdrop-blur-xl
              "
            >
              <div className="text-xs font-medium text-white">
                {minutes} minutes studied
              </div>

              <div className="text-[11px] text-white/50 mt-1">
                {format(new Date(date), 'EEEE, MMM d, yyyy')}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
