import { ipcRenderer } from 'electron';

export const api = {
  tracker: {
    getStats: () => ipcRenderer.invoke('tracker:get-stats'),

    getStatistics: () => ipcRenderer.invoke('statistics:get-all'),

    start: () => ipcRenderer.send('tracker:start'),

    stop: () => ipcRenderer.send('tracker:stop'),
  },

  window: {
    minimize: () => ipcRenderer.send('window:minimize'),

    maximize: () => ipcRenderer.send('window:maximize'),

    close: () => ipcRenderer.send('window:close'),
  },
};
