
import { useState } from 'react';
import { Box, Card, Typography, FormControl, FormLabel, TextField, Button } from '@mui/material';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

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
    </Box>
  )
}