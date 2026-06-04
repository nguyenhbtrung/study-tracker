import { ipcRenderer } from 'electron';

import { IPC_CHANNELS, type ElectronAPI } from '../shared/ipc';

export const api: ElectronAPI = {
  tracker: {
    getStats: () => ipcRenderer.invoke(IPC_CHANNELS.TRACKER.GET_STATS),

    getStatistics: () =>
      ipcRenderer.invoke(IPC_CHANNELS.TRACKER.GET_STATISTICS),

    start: () => ipcRenderer.send(IPC_CHANNELS.TRACKER.START),

    stop: () => ipcRenderer.send(IPC_CHANNELS.TRACKER.STOP),

    pause: () => ipcRenderer.send(IPC_CHANNELS.TRACKER.PAUSE),

    resume: () => ipcRenderer.send(IPC_CHANNELS.TRACKER.RESUME),
  },

  window: {
    minimize: () => ipcRenderer.send(IPC_CHANNELS.WINDOW.MINIMIZE),

    maximize: () => ipcRenderer.send(IPC_CHANNELS.WINDOW.MAXIMIZE),

    close: () => ipcRenderer.send(IPC_CHANNELS.WINDOW.CLOSE),
  },
};
