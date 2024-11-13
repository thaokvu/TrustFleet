import { Box, Card, FormControl, FormLabel, Typography, TextField, Button } from "@mui/material"
import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card variant="outlined"
        sx={{
          width: 400,
          p: 2,
          boxShadow: 2,
        }}
      >
        <Box component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Login
          </Typography>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <TextField
              type="email"
              value={email}
              placeholder="username@email.com"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <TextField
              type="password"
              value={password}
              placeholder="••••••••••••••••••"
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Card>
    </Box>
  )
}