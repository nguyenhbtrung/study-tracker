import { app } from 'electron';
import { createMainWindow } from '../processes/main-window/window';
import { registerIpcHandlers } from './ipc-registry';
import { Container } from '@ntrg/simple-di';
import { createContainer } from './container';
import { TrackerService } from '../features/tracker/tracker.service';

let container: Container;
let trackerService: TrackerService;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

app.setAppUserModelId('com.squirrel.StudyTracker.StudyTracker');

// console.log(app.getPath('userData'));

app.whenReady().then(() => {
  createMainWindow();

  container = createContainer();
  registerIpcHandlers(container);

  trackerService = container.resolve(TrackerService);

  trackerService.startTracking();
});

app.on('before-quit', () => {
  trackerService.stopTracking();
});
