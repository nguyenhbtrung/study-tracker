import { app } from 'electron';
import { createMainWindow } from '../processes/main-window/window';
import { registerIpcHandlers } from './ipc-registry';
import { trackerService } from '../features/tracker/tracker.handler';

app.whenReady().then(() => {
  createMainWindow();
  registerIpcHandlers();

  trackerService.startTracking();
});

app.on('before-quit', () => {
  trackerService.stopTracking();
});
