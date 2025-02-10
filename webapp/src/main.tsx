import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './Routes.tsx'
import './style/index.css'

document.documentElement.setAttribute(
  "data-theme", "primary"
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
