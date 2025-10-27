import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from '../pages/App/ui/App.tsx'
import { AppReduxProvider } from './providers/AppReduxProvired.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppReduxProvider>
      <App />
    </AppReduxProvider>
  </StrictMode>,
)
