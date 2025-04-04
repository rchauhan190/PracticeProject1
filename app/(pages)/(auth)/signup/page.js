import * as React from "react";
import Box from "@mui/material/Box";
import Signup from "../../../components/Signup"

export default function SignUpPage() {
  return (
    <Box sx={{ position: "relative" }}>
      <Box sx={{display:"flex", justifyContent:"space-between"}}>
        <Box
          sx={{
            width: 150,
            height: 150,
            padding: -40,
            bgcolor: "#2b5bc7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "150px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position:"relative",
            left:"-65px",
            top:"-60px"
          }}
        ></Box>
      
      <Box
        sx={{
          width: 600,
          height: 600,
          borderRadius: "600px",
          bgcolor: "#2b5bc7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position:"relative",
          left:"170px",
          top:"-50px"
        }}
        ></Box>
        </Box>
        <Box sx={{display:"flex"}}>

        <Box
          sx={{
            width: 500,
            height: 500,
            padding: -40,
            bgcolor: "#2b5bc7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "500px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position:"relative",
            left:"-175px",
            top:"60px"
            
            
            
          }}
          ></Box>
          </Box>

      <Signup/>
    </Box>
  );
}
