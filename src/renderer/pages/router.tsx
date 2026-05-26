import { createHashRouter } from 'react-router-dom';
import { DashboardPage } from './dashboard';
import { Layout } from '../widgets/layout';
import { StatisticsPage } from './statistics';
import { RankingPage } from './ranking';

export const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'tasks',
        element: <div />,
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
      },
      {
        path: '/ranking',
        element: <RankingPage />,
      },
      {
        path: 'settings',
        element: <div />,
      },
    ],
  },
]);
