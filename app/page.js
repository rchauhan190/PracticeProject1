import React from "react";
import Box from "@mui/material/Box";
import HomeNavbar from './components/HomeNavbar'
import HomeBody from './components/HomeBody'


export default function Home() {
  return (
    <Box>
   
    <Box sx={{ display: "flex", flexDirection: "column",}}>
      <HomeNavbar/>
      <HomeBody/>
         
    
    </Box>
    </Box>
   
  );
}
