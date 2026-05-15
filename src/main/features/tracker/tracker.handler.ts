import { ipcMain } from 'electron';
import { TrackerService } from './tracker.service';

export const trackerService = new TrackerService();

export function registerTrackerIPC() {
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
