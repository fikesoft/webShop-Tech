//import { trpc } from './lib/trpc'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRote } from './components'
import { MainLayout, ContLayout } from './layouts'
import { HomePage, Contact, Error404, Livrare, DespreNoi, Google } from './pages'
import { Comenzi, DatePersonale, NewSeller, Securitate } from './pages'
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
          path: 'cont-personal',
          element: (
            <ProtectedRote requireAuth={true} allowedRoles={['user']}>
              <ContLayout />
            </ProtectedRote>
          ),
          children: [
            {
              index: true,
              element: <Comenzi />,
            },
            {
              path: 'date-personale',
              element: <DatePersonale />,
            },
            {
              path: 'securitate',
              element: <Securitate />,
            },
            {
              path: 'news-seller',
              element: <NewSeller />,
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
