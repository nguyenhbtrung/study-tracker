import type { StatisticsResponse } from '../types/statistics.types';
import type { StatsResponse } from '../types/tracker.types';

export interface TrackerIPC {
  getStats(): Promise<StatsResponse>;

  getStatistics(): Promise<StatisticsResponse>;

  start(): void;

  stop(): void;

  pause(): void;

  resume(): void;
}
