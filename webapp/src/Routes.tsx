import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Page } from './constant/Page';
import Daily from './page/daily';
import Online from './page/online';

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: Page.Online, element: <Online /> },
        { path: Page.Daily, element: <Daily /> },
        { path: '/*', element: <Navigate to={Page.Online} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
