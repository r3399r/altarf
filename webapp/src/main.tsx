import { createRoot } from 'react-dom/client';
import AppRoutes from './Routes.tsx';
import Loader from './components/Loader.tsx';
import { Provider } from 'react-redux';
import { configStore } from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './style/index.css';

const store = configStore();

document.documentElement.setAttribute('data-theme', 'primary');
createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
    <Provider store={store}>
      <AppRoutes />
      <Loader />
    </Provider>
  </GoogleOAuthProvider>,
);
