import { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Page } from './constant/Page';

// Lazy-loaded components
const Daily = lazy(() => import('./page/daily'));
const Online = lazy(() => import('./page/online'));
const OnlineInterpretation = lazy(() => import('./page/onlineInterpretation'));
const Records = lazy(() => import('./page/records'));
const Wallet = lazy(() => import('./page/wallet'));

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: Page.Online, element: <Online /> },
        { path: `${Page.Online}/:id`, element: <OnlineInterpretation /> },
        { path: Page.Daily, element: <Daily /> },
        { path: Page.Records, element: <Records /> },
        { path: Page.Wallet, element: <Wallet /> },
        { path: '/*', element: <Navigate to={Page.Online} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
