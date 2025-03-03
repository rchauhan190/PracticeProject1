import React from "react";
import Box from "@mui/material/Box";
import NavSide from "../../card/NavSide";
import Nav from "../../card/Nav";
import Consumers from '../../card/Consumers'

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
