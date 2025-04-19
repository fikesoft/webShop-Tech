//import { trpc } from './lib/trpc'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './layouts'
import { HomePage, LoginPage } from './pages'

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
        {
          path: 'login',
          element: <LoginPage />,
        },
      ],
    },
  ])
  return <RouterProvider router={routes}></RouterProvider>
}

export default App
