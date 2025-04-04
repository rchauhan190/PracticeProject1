import React from "react";
import { Box, Divider } from "@mui/material";
import Navbarcms from "../../../components/Navbarcms";
import SideNavCms from "../../../components/SideNavCms";
import SportsTeamDataCard from "../../../components/SportsTeamData";

export default function SportsTeam() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Navbarcms />
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <SideNavCms/> 
        <SportsTeamDataCard/>  
      </Box>
    </Box>
  );
}
