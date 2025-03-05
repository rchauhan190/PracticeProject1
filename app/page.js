import React from "react";
import Box from "@mui/material/Box";
import HomeNavbar from './(components)/card/HomeNavbar'
import HomeBody from './(components)/card/HomeBody'


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
