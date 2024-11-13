import { Box, Card, Typography, TextField, Button, Grid, Avatar } from "@mui/material";
import { useState } from "react";
import { Star } from "@mui/icons-material"; // Replace with actual icons

export default function Browse() {
  const vehicleList = [
    {
      make: "Car Make Model",
      location: "Location",
      company: "Rental Company",
      price: "Price/Day",
      pickupDate: "MM/DD/YYYY",
      dropoffDate: "MM/DD/YYYY",
    },
  ]];

const [vehicles, setVehicles] = useState(vehicleList);
const [searchTerm, setSearchTerm] = useState("");

 // Handle search functionality
function handleSearchClick() {
  if (searchTerm === "") {
    setVehicles(vehicleList); // Show all if search term is empty
    return;
  }
  const filterBySearch = vehicleList.filter((vehicle) =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())
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
        {vehicles.map((vehicle, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar>{vehicle.make.charAt(0)}</Avatar>
                <Box ml={2}>
                  <Typography variant="h6">{vehicle.make}</Typography>
                  <Typography color="textSecondary">{vehicle.location}</Typography>
                </Box>
              </Box>
              <Box mb={2} display="flex" flexDirection="column">
                <Typography variant="body2">{vehicle.company}</Typography>
                <Typography color="textSecondary">{vehicle.price}</Typography>
              </Box>
              <Box display="flex" gap={2}>
                <TextField
                  label="Pickup Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  />
                <TextField
                  label="Dropoff Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
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
  
