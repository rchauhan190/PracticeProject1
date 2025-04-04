import React from 'react';
import {
  Link,
  Box,
  TextField,
  Typography,
  Button,
  Divider

} from "@mui/material";
import Navbarcms from "../../../components/Navbarcms";
import SideNavCms from "../../../components/SideNavCms";
import ListSportsTeamData from "../../../components/ListSportsTeamData"

export default function page() {
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <Navbarcms/>  
      <Divider/>
      <Box sx={{display:"flex",flexDirection:"row"}}>

      <SideNavCms/> 
      <ListSportsTeamData/>
     
      </Box>

    </Box>
  )
}
