"use client";

import Image from "next/image";
import { AppBar, Box, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; 
import logo from "../../public/logo.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from '@mui/icons-material/Chat';
import { useRouter } from 'next/navigation';


export default function Navbarcms() {
  const theme = useTheme();
  const { mode, toggleTheme } = useContext(ThemeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const router = useRouter()

  const handleClick = ()=>{
    router.push("/chats")
  }

  return (
    <Box
    sx={{
      width: "100vw",
      height: isMobile ? 60 : isTablet ? 70 : 90,
      bgcolor: mode === "dark" ? "#1A1A1A" : "#fff",
      color: mode === "light" ? "#1A1A1A" : "#fff",
      px: { xs: 2, sm: 3, md: 3 },
      margin:"-1px 0px",
      border:"none",
    }}
      >

  
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Image
          src={logo}
          alt="wizcle"
          width={isMobile ? 120 : isTablet ? 180 : 230}
          height={isMobile ? 40 : isTablet ? 60 : 60}
        />

        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, sm: 3, md: 2 },
            
            alignItems: "center",
          }}
        >
         
          
         <IconButton  onClick={handleClick} aria-label="Go to chat">
      <ChatIcon  />
    </IconButton>
          <IconButton sx={{py:"-10px"}} onClick={toggleTheme} >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
