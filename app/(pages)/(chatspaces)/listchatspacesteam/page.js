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
import ListChatSpacesTeam from "../../../components/ListChatSpacesTeams"

export default function page() {
  return (
    <Box sx={{display:"flex",flexDirection:"column"}}>
      <Navbarcms/>  
      <Divider/>
      <Box sx={{display:"flex",flexDirection:"row"}}>

      <SideNavCms/> 
      <ListChatSpacesTeam/>
     
      </Box>

    </Box>
  )
}
