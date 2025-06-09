import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Loader from './components/Loader.tsx';
import { configStore } from './redux/store.ts';
import AppRoutes from './Routes.tsx';
import './style/index.css';

const store = configStore();

document.documentElement.setAttribute('data-theme', 'primary');
createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
      <Loader />
    </Provider>
  </GoogleOAuthProvider>,
);
