import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'
import './index.css'
import { CssBaseline } from '@mui/material'
import Login from './components/Login'
import Signup from './components/Signup'
import Browse from './components/Browse'
import Bookings from './components/Bookings'

const theme = createTheme({})

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <></>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router}/>
    </ThemeProvider>
  </StrictMode>,
)
