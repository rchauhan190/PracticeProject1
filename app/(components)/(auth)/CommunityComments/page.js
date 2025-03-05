import React from "react";
import Box from "@mui/material/Box";
import CommunityNavSide from "../../card/CommunityNavSide";
import Nav from "../../card/Nav";
import CommunityReplyBody from "../../card/CommunityBody"

export default function ProfilePage() {
  return (
    <div>
      <Box>
        <Nav />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
         <CommunityNavSide/>
         <CommunityReplyBody/>
     
        </Box>
      </Box>
    </div>
  );
}
