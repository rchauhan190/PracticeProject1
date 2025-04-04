import React from "react";
import Box from "@mui/material/Box";
import CommunityNavSide from "../../../components/CommunityNavSide";
import Nav from "../../../components/Nav";
import CommunityReplyBody from "../../../components/CommunityBody"

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
