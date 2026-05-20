import { Container } from '@ntrg/simple-di';
import { registerTrackerIPC } from '../features/tracker';

export function registerIpcHandlers(container: Container) {
  registerTrackerIPC(container);
}
