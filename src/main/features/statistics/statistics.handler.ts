import { ipcMain } from 'electron';
import { Container } from '@ntrg/simple-di';
import { StatisticsService } from './statistics.service';
import { IPC_CHANNELS } from '@shared/ipc';

export function registerStatisticsIPC(container: Container) {
  const statisticsService = container.resolve(StatisticsService);

  ipcMain.handle(IPC_CHANNELS.TRACKER.GET_STATISTICS, () => {
    return statisticsService.getStatistics();
  });
}
