import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './Routes.tsx';
import './style/index.css';
import Loader from './components/Loader.tsx';
import { Provider } from 'react-redux';
import { configStore } from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = configStore();

document.documentElement.setAttribute('data-theme', 'primary');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <Provider store={store}>
        <AppRoutes />
        <Loader />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
