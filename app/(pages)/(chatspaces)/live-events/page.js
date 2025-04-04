import React from 'react';
import {
  Box,
  Divider

} from "@mui/material";
import Navbarcms from "../../../components/Navbarcms";
import SideNavCms from "../../../components/SideNavCms";
import LiveEvents from "../../../components/LiveEvents";

export default function page() {
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <Navbarcms/>  
      <Divider/>
      <Box sx={{display:"flex",flexDirection:"row"}}>

      <SideNavCms/>
      <LiveEvents/> 
      </Box>

    </Box>
  )
}
