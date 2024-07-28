import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Page } from './constant/Page';
import Home from './page/home';

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: Page.Home, element: <Home /> },
        { path: '/*', element: <Navigate to={Page.Home} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
