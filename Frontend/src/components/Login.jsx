import { Box, Card, FormControl, FormLabel, Typography, TextField, Button } from "@mui/material"
import { useState } from "react"
import { makeRequest } from "../utils/request"
import Notification from "./Notification"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [notif, setNotif] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await makeRequest({
        method: "GET",
        url: `/customer/email/${email}`,
      })
      localStorage.setItem('customerId', data.custID)
      await makeRequest({
        method: "POST",
        url: "/login",
        body: {
          email,
          password,
        }
      })
      await makeRequest({
        method: "POST",
        url: `/customer/${data.custID}/verify`,
        body: {
          otp_code: otpCode,
        },
      })
      setNotif('Login successful!')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
          <FormControl>
            <FormLabel>OTP Code</FormLabel>
            <TextField
              type="password"
              value={otpCode}
              placeholder="••••••••••••••••••"
              onChange={(e) => setOtpCode(e.target.value)}
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
      <Notification text={notif} />
    </Box>
  )
}