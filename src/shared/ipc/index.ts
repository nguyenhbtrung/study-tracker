import type { TrackerIPC } from './tracker.ipc';
import type { WindowIPC } from './window.ipc';

export interface ElectronAPI {
  tracker: TrackerIPC;

  window: WindowIPC;
}

export * from './channels';
