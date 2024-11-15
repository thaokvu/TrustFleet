import { Box, Card, Typography, TextField, Button, Grid, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { Star } from "@mui/icons-material"; // Replace with actual icons
import axios from "axios";

export default function Browse() {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch rentals and vehicle details by customer ID
  async function fetchRentals() {
    try {
      const response = await axios.get(`/customer/1/rentals`); // Replace '1' with actual customer ID
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching rentals:", error);
    }
  }

  useEffect(() => {
    fetchRentals();
  }, []);

  // Handle search functionality
  function handleSearchClick() {
    if (searchTerm === "") {
      fetchRentals(); // Reload all vehicles if search term is empty
      return;
    }
    const filterBySearch = vehicles.filter((rental) =>
      rental.vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setVehicles(filterBySearch);
  }

  return (
    <Box p={2}>
      {/* Search Bar */}
      <Box display="flex" gap={2} mt={3} mb={2}>
        <TextField
          label="Search for vehicles"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </Box>

      {/* Vehicle Card */}
      <Grid container spacing={2}>
        {vehicles.map((rental, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar>{rental.vehicle.make.charAt(0)}</Avatar>
                <Box ml={2}>
                  <Typography variant="h6">
                    {rental.vehicle.make} {rental.vehicle.model} ({rental.vehicle.year})
                  </Typography>
                  <Typography color="textSecondary">{rental.vehicle.status}</Typography>
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
              <Box display="flex" gap={2}>
                <TextField
                  label="Pickup Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={rental.startDate ? rental.startDate.split("T")[0] : ""}
                  disabled
                />
                <TextField
                  label="Dropoff Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={rental.endDate ? rental.endDate.split("T")[0] : ""}
                  disabled
                />
              </Box>
              <Box display="flex" justifyContent="flex-end" mt={2} gap={1}>
                <Button variant="outlined">Cancel</Button>
                <Button variant="contained" color="primary">
                  Confirm
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

