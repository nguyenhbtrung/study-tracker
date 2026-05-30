import { BrowserWindow, ipcMain } from 'electron';
import { IPC_CHANNELS } from '@shared/ipc';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let win: BrowserWindow;

export function createMainWindow() {
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

  ipcMain.on(IPC_CHANNELS.WINDOW.MINIMIZE, () => win.minimize());

  ipcMain.on(IPC_CHANNELS.WINDOW.MAXIMIZE, () => {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });

  ipcMain.on(IPC_CHANNELS.WINDOW.CLOSE, () => win.close());
}
