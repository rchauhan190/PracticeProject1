import React from "react";
import { Box, Divider } from "@mui/material";
import Navbarcms from "../../../components/Navbarcms";
import SideNavCms from "../../../components/SideNavCms";
import SportsCompetitionCard from "../../../components/SportsCompetitionCard";

export default function SportsCompetition() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Navbarcms />
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <SideNavCms/> 
        <SportsCompetitionCard/>  
      </Box>
    </Box>
  );
}
