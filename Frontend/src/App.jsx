import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

function App() {
  return (
    <div>
      <Header />
      <Container sx={{
        mt: 4,
      }}>
        <Outlet />
      </Container>
    </div>
  )
}

export default App
