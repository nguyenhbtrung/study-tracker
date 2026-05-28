import { ipcMain } from 'electron';
import { TrackerService } from './tracker.service';
import { Container } from '@ntrg/simple-di';
import { IPC_CHANNELS } from '../../../shared/ipc';

export function registerTrackerIPC(container: Container) {
  const trackerService = container.resolve(TrackerService);

  ipcMain.handle(IPC_CHANNELS.TRACKER.GET_STATS, () => {
    return trackerService.getStats();
  });

  ipcMain.on(IPC_CHANNELS.TRACKER.START, () => {
    trackerService.start();
  });

  ipcMain.on(IPC_CHANNELS.TRACKER.STOP, () => {
    trackerService.stop();
  });
}
