import { ipcMain } from 'electron';
import { Container } from '@ntrg/simple-di';
import { StatisticsService } from './statistics.service';

export function registerStatisticsIPC(container: Container) {
  const statisticsService = container.resolve(StatisticsService);

  ipcMain.handle('statistics:get-all', () => {
    return statisticsService.getStatistics();
  });
}
