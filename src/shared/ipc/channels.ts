export const IPC_CHANNELS = {
  TRACKER: {
    GET_STATS: 'tracker:get-stats',
    GET_STATISTICS: 'statistics:get-all',
    START: 'tracker:start',
    STOP: 'tracker:stop',
    PAUSE: 'tracker:pause',
    RESUME: 'tracker:resume',
  },

  WINDOW: {
    MINIMIZE: 'window:minimize',
    MAXIMIZE: 'window:maximize',
    CLOSE: 'window:close',
  },
} as const;
