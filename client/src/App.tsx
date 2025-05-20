//import { trpc } from './lib/trpc'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from './layouts'
import { HomePage, Contact, Error404, Livrare, DespreNoi, Google } from './pages'
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
        {
          path: 'contacte',
          element: <Contact />,
        },
        {
          path: 'livrare',
          element: <Livrare />,
        },
        {
          path: 'despre-noi',
          element: <DespreNoi />,
        },
        {
          path: 'auth',
          children: [
            {
              path: 'google',
              element: <Google />,
            },
          ],
        },
        {
          path: '*',
          element: <Error404 />,
        },
      ],
    },
  ])
  return <RouterProvider router={routes}></RouterProvider>
}

export default App
