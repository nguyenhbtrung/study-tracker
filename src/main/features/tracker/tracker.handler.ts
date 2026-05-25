import { ipcMain } from 'electron';
import { TrackerService } from './tracker.service';
import { Container } from '@ntrg/simple-di';

export function registerTrackerIPC(container: Container) {
  const trackerService = container.resolve(TrackerService);

  ipcMain.handle('tracker:get-stats', () => {
    return trackerService.getStats();
  });

  ipcMain.on('tracker:start', () => {
    trackerService.start();
  });

  ipcMain.on('tracker:stop', () => {
    trackerService.stop();
  });
}
