import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout';
import { Page } from './constant/Page';
import Daily from './page/daily';
import Online from './page/online';
import OnlineInterpretation from './page/onlineInterpretation';
import Records from './page/records';
import Wallet from './page/wallet';

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
