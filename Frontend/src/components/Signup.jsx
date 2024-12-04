
import { useState } from 'react';
import { Box, Card, Typography, FormControl, FormLabel, TextField, Button } from '@mui/material';
import { makeRequest } from '../utils/request';
import Notification from './Notification';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qrcodeSrc, setQrcodeSrc] = useState('');
  const [notif, setNotif] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission
    const data = await makeRequest({
      url: '/customer',
      method: 'POST',
      body: {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      }
    });
    // set qrcode url
    setQrcodeSrc(URL.createObjectURL(data));
    setNotif("You are signed up!. Scan the QR code with your auth app:")
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '50px',
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
            Sign Up
          </Typography>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <TextField
              type="text"
              value={firstName}
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <TextField
              type="text"
              value={lastName}
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <TextField
              type="tel"
              value={phoneNumber}
              placeholder="123-456-7890"
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
            />
          </FormControl>
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
            Sign Up
          </Button>
        </Box>
      </Card>
      {qrcodeSrc && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}>
          <img src={qrcodeSrc} alt="QR Code" />
        </div>
      )}
      <Notification text={notif} />
    </Box>
  )
}