import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { AppReduxProvider } from './providers/AppReduxProvired.tsx';
import { DefaultLayout } from '@ui/layouts/DefaultLayout/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppReduxProvider>
      <DefaultLayout />
    </AppReduxProvider>
  </StrictMode>,
);
