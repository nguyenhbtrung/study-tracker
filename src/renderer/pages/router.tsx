import { createHashRouter } from 'react-router-dom';
import { DashboardPage } from './dashboard';
import { Layout } from '../widgets/layout';

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
        element: <div />,
      },
      {
        path: 'settings',
        element: <div />,
      },
    ],
  },
]);
