import React from "react";
import Box from "@mui/material/Box";
import NavSide from "../../card/NavSide";
import Nav from "../../card/Nav";
import ProfileUi from "../../card/ProfileUi";

export default function ProfilePage() {
  return (
    <div>
      <Box>
        <Nav />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <NavSide />
          <ProfileUi />
        </Box>
      </Box>
    </div>
  );
}
