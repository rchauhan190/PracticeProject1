import React from "react";
import Box from "@mui/material/Box";
import NavSide from "../../../components/NavSide";
import Nav from "../../../components/Nav";
import Consumers from '../../../components/Consumers'

export default function page() {
  return (
    <Box>
    <Nav />
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <NavSide />
      <Consumers/>
    
    </Box>
    </Box>

  )
}
