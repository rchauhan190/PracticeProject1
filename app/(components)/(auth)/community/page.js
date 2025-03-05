import React from "react";
import Box from "@mui/material/Box";
import CommunityNavSide from "../../card/CommunityNavSide";
import Nav from "../../card/Nav";
import CommunityBody from "../../card/CommunityBody"

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
