import { Box, Card, FormControl, FormLabel, Typography, TextField, Button } from "@mui/material"
import { useState } from "react"

export default function Browse() {
  const filters = [ //TODO make filter list
    ""
  ];

  const vehicleList = [ // this is a temporary list
    //TODO make actual call to backend for list of vehicles using the filters

  ];

  const [vehicles, setVehicles] = useState(vehicleList);
  const [searchTerm, setSearchTerm] = useState("");

  //filter fetched vehicles by the search term
  function handleSearchClick() {
    //maybe handle the backend request here?
    if(searchTerm === "") {
      setVehicles(vehicleList);
      return;
    }
    const filterBySearch = vehicleList.filter((vehicle) => {
      if(/*vehiclename*/.toLowerCase().includes(searchTerm.toLowerCase())) {
        return vehicle;
      }
      setVehicles(filterBySearch);
    })
  }

  return (
    <>
    </>
  )
}
