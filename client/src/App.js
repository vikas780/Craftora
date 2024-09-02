import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import {
  Home,
  Register,
  Error,
  Navbar,
  Products,
  Artisan,
  Cart,
} from './pages/index'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AppLayout() {
  return (
    <div className='max-w-[1400px] mx-auto'>
      <ToastContainer />
      <Navbar />
      <div className='max-w-[1340px] mx-auto'>
        <Outlet />
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/artisan',
        element: (
          <ProtectedRoute>
            <Artisan />
          </ProtectedRoute>
        ),
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
