import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TrpcProvider } from './lib/trpc'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TrpcProvider>
      <App />
    </TrpcProvider>
  </StrictMode>,
)
