import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function HomeNavbar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "140px",
        display: "flex",
        backgroundColor: "#ffffff",
        boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box sx={{ position: "relative", top: "35px", left: "10p" }}>
        <Image src={logo} alt="wizcle" />
      </Box>
      <Box
        sx={{
          width: "40%",
          height: "50px",
          display: "flex",
          position: "relative",
          top: "55px",
          left: "100px",
          color: "#2b5bc7",
          justifyContent: "space-between",
        }}
      >
        <Typography>Home</Typography>
        <Typography>Courses</Typography>
        <Typography>services</Typography>
        <Typography>Contact</Typography>
      </Box>
      <Box sx={{display:"flex",justifyContent:"space-between",flexDirection:"row",alignItems:"center",position:"relative",top:"37px",left:"350px",width:"20%",height:"50px",}}>
     
      <Link
          href="/signup"
  
            
            sx={{  color: "#00308F" }}
          >
            Sign Up
          </Link>
      <Button  href="/signin" sx={{color: "#ffffff",backgroundColor:"#2b5bc7",width:"250px",height:"50px",borderRadius:"30px"}}>Sign In</Button>

        
      </Box>
    </Box>  
  );
}
