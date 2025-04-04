import React from "react";
import { Box, Divider } from "@mui/material";
import Navbarcms from "../../../components/Navbarcms";
import SideNavCms from "../../../components/SideNavCms";
import SportsPlayerCard from "../../../components/SportsPlayerCard";

export default function SportsPlayers() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Navbarcms />
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <SideNavCms/> 
        <SportsPlayerCard/>  
      </Box>
    </Box>
  );
}
