//import { trpc } from './lib/trpc'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './layouts'
import { HomePage } from './pages'
import './assets/style/index.scss'
function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
  ])
  return <RouterProvider router={routes}></RouterProvider>
}

export default App
