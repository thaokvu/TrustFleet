import { Box, Card, FormControl, FormLabel, Typography, TextField, Button, Autocomplete } from "@mui/material"
import { useState } from "react"
import { makeRequest } from '../utils/request';

export default function Browse() {

  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [myOptions, setMyOptions] = useState([]);

  //filter fetched vehicles by the search term
  async function handleSearchClick() {
    const vehicleList = await makeRequest({
      url: '/vehicles',
      method: 'GET'
    });

    if (searchTerm === "") {
      setVehicles(vehicleList);
      return;
    }

    const filterBySearch = vehicleList.filter((vehicle) => {
      if (vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())) {
        return vehicle;
      } else if (vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())) {
        return vehicle;
      }
      setVehicles(filterBySearch);
    })
  }

  return (
    <>
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
      {vehicles.map(function (data) {
        return (
          <Card key={data.vIN} variant="outlined"
            sx={{
              width: 400,
              p: 2,
              boxShadow: 2,
            }}>
            <Box
              sx={{
              width:'100%',
            display: 'flex',
            flexDirection: 'column',
            }}
          >

            <Typography variant="h5" sx={{ textAlign: 'left' }}>
              {data.year} {data.model} {data.make}
            </Typography>
            <Button
              variant="contained"
            >
              <Typography variant="h5">
                Rent
              </Typography>
            </Button>

          </Box>
        </Card >
      )
})}
    </>
  )
}
