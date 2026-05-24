import { createHashRouter } from 'react-router-dom';
import { DashboardPage } from './dashboard';
import { Layout } from '../widgets/layout';
import { StatisticsPage } from './statistics';

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
        path: 'settings',
        element: <div />,
      },
    ],
  },
]);
