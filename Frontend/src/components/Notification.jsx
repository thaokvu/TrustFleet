import { Typography } from "@mui/material";

export default function Notification({ text }) {
  if (!text) {
    return null;
  }

  return (
    <Typography variant="h5">
      {text}
    </Typography>
  )
}