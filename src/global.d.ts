import { StatisticsResponse } from './shared/types/statistics.types';
import { StatsResponse } from './shared/types/tracker.types';

export {};

declare global {
  interface Window {
    api: {
      tracker: {
        getStats(): Promise<StatsResponse>;

        getStatistics(): Promise<StatisticsResponse>;

        start(): void;

        stop(): void;
      };

      window: {
        minimize(): void;

        maximize(): void;

        close(): void;
      };
    };
  }
}
