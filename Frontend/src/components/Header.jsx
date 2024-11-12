import { AppBar, Container, Typography, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function NavbarItem({ text, path }) {
  return (
    <NavLink to={path}>
      <Typography variant="button">
        {text}
      </Typography>
    </NavLink>
  )
}

NavbarItem.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
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
          gap: 6,
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        >
          <NavbarItem path="/home" text="Home" />
          <NavbarItem path="/login" text="Login" />
          <NavbarItem path="/signup" text="Signup" />
          <NavbarItem path="/browse" text="Browse" />
          <NavbarItem path="/bookings" text="Bookings" />
        </Toolbar>
      </AppBar>
    </Container>
  )
}