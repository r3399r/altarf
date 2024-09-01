import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Page } from './constant/Page';
import Daily from './page/daily';
import Tarot from './page/tarot';

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: Page.Tarot, element: <Tarot /> },
        { path: Page.Daily, element: <Daily /> },
        { path: '/*', element: <Navigate to={Page.Tarot} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
