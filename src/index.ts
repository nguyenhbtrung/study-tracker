import { app, BrowserWindow, ipcMain } from 'electron';
import { getStats, startTracking, stopTracking } from './core/trackerService';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let win: BrowserWindow;

function createWindow(): void {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#0f0f1a',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
}

app.whenReady().then(() => {
  createWindow();
  startTracking();
});

app.on('before-quit', () => {
  stopTracking();
});

// stats
ipcMain.handle('get-stats', () => getStats());

// window controls
ipcMain.on('window:minimize', () => win.minimize());

ipcMain.on('window:maximize', () => {
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
});

ipcMain.on('window:close', () => win.close());
