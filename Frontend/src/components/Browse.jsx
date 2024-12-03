import { Box, Card, Typography, TextField, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { makeRequest } from '../utils/request';

export default function Browse() {

  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    })
    setVehicles(filterBySearch);
  }

  useEffect(() => {
    handleSearchClick();
  }, [searchTerm])

  async function handleSubmit(e, vehicle) {
    e.preventDefault();
    const customerId = parseInt(localStorage.getItem('customerId'));
    const data = {
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      miles: vehicle.miles,
      initialCondition: vehicle.condition,
      FKCus: customerId,
      FKVehicle: vehicle.vIN,
      status: vehicle.status,
    }
    await makeRequest({
      url: '/rental',
      method: 'POST',
      body: data
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
      </Box>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
      }}>
        {vehicles.map(function (data) {
          return (
            <Card key={data.vIN} variant="outlined"
              sx={{
                width: 400,
                p: 2,
                boxShadow: 2,
              }}>
              <form onSubmit={e => handleSubmit(e, data)}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <Typography variant="h5" sx={{ textAlign: 'left' }}>
                    {data.year} {data.model} {data.make}
                  </Typography>
                  <TextField
                    label="Pickup Date"
                    type="date"
                    name="startDate"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <TextField
                    label="Dropoff Date"
                    type="date"
                    name="endDate"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    <Typography variant="h5">
                      Rent
                    </Typography>
                  </Button>
                </Box>
              </form>
            </Card >
          )
        })}
      </div>
    </>
  )
}
