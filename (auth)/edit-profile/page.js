import React from "react";
import Box from "@mui/material/Box";
import NavSide from "../../card/NavSide";
import Nav from "../../card/Nav";
import EditProfile from "../../card/EditProfile"

export default function ProfilePage() {
  return (
    <div>
      <Box>
        <Nav />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <NavSide />
          <EditProfile />
        </Box>
      </Box>
    </div>
  );
}
