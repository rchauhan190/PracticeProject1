import React from "react";
import Box from "@mui/material/Box";
import { IconButton,Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FeedIcon from "@mui/icons-material/Feed";
import SpaSharpIcon from "@mui/icons-material/SpaSharp";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

function NavSide() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          width: "6vw",
          height: "85vh",
          borderRadius: "25px",
          margin: "20px",
          padding: "35px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          left: "-30px",
        }}
      >
        <Box
          sx={{
            color: "#000000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "50px",
          }}
        > <IconButton component={Link} href="/">
          <HomeIcon />
      </IconButton>
    
          <IconButton component={Link} href="/consumers">
            <AssignmentIcon />
          </IconButton>
          <IconButton component={Link} href="/community">
           
          <SpaSharpIcon />
          </IconButton>
      
          <IconButton component={Link} href="/competitions">
          <FeedIcon />
           
          </IconButton>
         
        </Box>
        <Box sx={{ backgroundColor: "#87CDF6", borderRadius: "14px" }}>
          <KeyboardDoubleArrowRightIcon />
        </Box>
      </Box>
    </div>
  );
}

export default NavSide;
