import { AppBar, Container, Typography, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";

function NavbarItem({ text, path }) {
  return (
    <NavLink to={path}>
      <Typography variant="button">
        {text}
      </Typography>
    </NavLink>
  )
}

export default function Header() {
  return (
    <Container maxWidth="sm" sx={{ mt: 2, }}>
      <AppBar position="static" color="background.default" sx={{
        border: '1px solid black',
        borderRadius: 2,
      }}>
        <Toolbar sx={{
          flexShrink: 1,
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        >
          <NavbarItem path="/home" text="Home" />
          <NavbarItem path="/login-signup" text="Login/Signup" />
          <NavbarItem path="/browse" text="Browse" />
          <NavbarItem path="/booking" text="Booking" />
        </Toolbar>
      </AppBar>
    </Container>
  )
}