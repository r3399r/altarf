import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './Routes.tsx';
import './style/index.css';
import Loader from './components/Loader.tsx';
import { Provider } from 'react-redux';
import { configStore } from './redux/store.ts';

const store = configStore();

document.documentElement.setAttribute('data-theme', 'primary');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
      <Loader />
    </Provider>
  </StrictMode>,
);
