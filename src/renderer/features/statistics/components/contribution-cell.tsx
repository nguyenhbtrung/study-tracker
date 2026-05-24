import { ContributionTooltip } from './contribution-tooltip';

type Props = {
  date: string;
  minutes: number;
  onClick?: () => void;
};

export function ContributionCell({ date, minutes, onClick }: Props) {
  function getLevel(minutes: number) {
    if (minutes === 0) {
      return 'bg-white/5';
    }

    if (minutes < 30) {
      return 'bg-green-900';
    }

    if (minutes < 60) {
      return 'bg-green-700';
    }

    if (minutes < 120) {
      return 'bg-green-500';
    }

    return 'bg-green-400';
  }

  return (
    <ContributionTooltip date={date} minutes={minutes}>
      <div
        onClick={onClick}
        className={`
          w-[14px]
          h-[14px]
          rounded-[3px]
          transition
          hover:scale-125
          hover:ring-2
          hover:ring-white/30
          cursor-pointer
          ${getLevel(minutes)}
        `}
      />
    </ContributionTooltip>
  );
}
