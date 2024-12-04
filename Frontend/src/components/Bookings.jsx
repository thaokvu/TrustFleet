import { Box, Card, Typography, TextField, Button, Grid, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { makeRequest } from "../utils/request";

export default function Browse() {
  const [rentals, setRentals] = useState([]);

  // Fetch rentals and vehicle details by customer ID
  async function fetchRentals() {
    const customerId = localStorage.getItem('customerId'); // Replace '1' with actual customer ID
    const data = await makeRequest({
      method: "GET",
      url: `/rentalrecord/customer/${customerId}`,
    })
    data.async
    const mergedData = await Promise.all(data.map(async (rental) => {
      const vehicle = await makeRequest({
        method: "GET",
        url: `/vehicle/vin/${rental.vehicleVIN}`,
      })
      return { ...rental, vehicle };
    }))
    setRentals(mergedData);
  }

  useEffect(() => {
    fetchRentals();
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {rentals.map((rental, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar>{rental.vehicle.make.charAt(0)}</Avatar>
                <Box ml={2}>
                  <Typography variant="h6">
                    {rental.vehicle.make} {rental.vehicle.model} ({rental.vehicle.year})
                  </Typography>
                  <Typography color="textSecondary">{rental.status}</Typography>
                </Box>
              </Box>
              <Box mb={2} display="flex" flexDirection="column">
                <Typography variant="body2">Rental ID: {rental.rentalID}</Typography>
                <Typography color="textSecondary">Status: {rental.status}</Typography>
                <Typography>
                  {new Date(rental.startDate).toLocaleDateString()} -{" "}
                  {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : "Ongoing"}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

