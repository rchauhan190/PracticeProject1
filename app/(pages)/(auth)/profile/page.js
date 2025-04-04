import React from "react";
import Box from "@mui/material/Box";
import NavSide from "../../../components/NavSide";
import Nav from "../../../components/Nav";
import ProfileUi from "../../../components/ProfileUi";

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
