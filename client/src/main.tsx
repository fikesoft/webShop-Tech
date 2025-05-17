import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TrpcProvider } from './lib/trpc'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TrpcProvider>
        <App />
      </TrpcProvider>
    </Provider>
  </StrictMode>
)
