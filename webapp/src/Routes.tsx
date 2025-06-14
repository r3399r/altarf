import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Page } from './constant/Page';
import { RootState } from './redux/store';

// Lazy-loaded components
const Daily = lazy(() => import('./page/daily'));
const Online = lazy(() => import('./page/online'));
const OnlineResult = lazy(() => import('./page/onlineResult'));
const Records = lazy(() => import('./page/records'));
const Wallet = lazy(() => import('./page/wallet'));
const Deposit = lazy(() => import('./page/deposit'));
const Backstage = lazy(() => import('./page/backstage'));

const AppRoutes = () => {
  const { isLogin } = useSelector((rootState: RootState) => rootState.ui);
  const authRouter = [
    { path: Page.Records, element: <Records /> },
    { path: Page.Wallet, element: <Wallet /> },
    { path: Page.Deposit, element: <Deposit /> },
    { path: Page.Backstage, element: <Backstage /> },
  ];
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: Page.Online, element: <Online /> },
        { path: `${Page.Online}/:id`, element: <OnlineResult /> },
        { path: Page.Daily, element: <Daily /> },
        ...(isLogin ? authRouter : []),
        { path: '/*', element: <Navigate to={Page.Online} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
