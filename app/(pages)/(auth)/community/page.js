"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import CommunityNavSide from "../../../components/CommunityNavSide";
import Nav from "../../../components/Nav";
import CommunityBody from "../../../components/CommunityBody"

export default function ProfilePage() {
  return (
    <div>
      <Box>
        <Nav />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
         <CommunityNavSide/>
         <CommunityBody/>
     
        </Box>
      </Box>
    </div>
  );
}
