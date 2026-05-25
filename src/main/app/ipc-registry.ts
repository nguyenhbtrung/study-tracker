import { Container } from '@ntrg/simple-di';
import { registerTrackerIPC } from '../features/tracker';
import { registerStatisticsIPC } from '../features/statistics';

export function registerIpcHandlers(container: Container) {
  registerTrackerIPC(container);
  registerStatisticsIPC(container);
}
