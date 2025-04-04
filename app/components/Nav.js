"use client"
import {useState, useEffect} from "react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "../../public/logo.png";
import user from "../../public/user.jpg";
import axios from "axios" 
import DropDown from "./DropDown"
import Link from "next/link"



export default function Nav() {
  const [profile,setProfile] = useState("");
    const [profileImage, setProfileImage] = useState(user);

  useEffect(()=>{
      const token = localStorage.getItem('token');
      axios.get ("https://api.staging.springprod.com/auth/v1/manager/profile",{
          headers:{
              Authorization:`Bearer ${token}`,
          },

      })
      .then((response)=>{
          console.log(response.data)
          setProfile(response.data.data)
      })   
      .catch((error)=>console.log("error",error))
      const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  },[])
;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
          display: "flex",
          width: "100vw",
          height: "10vh",
          margin: "7px",
          padding: "10px 40px",
        }}
      >
      
      <Image 
        src={logo} 
        alt="wizcle" 
        width={200} 
        height={50} 
        style={{ cursor: "pointer" }} 
      />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          >
          <Typography sx={{ color: "#000000", margin: "10px" }}>
          <Link href="/profile" passHref>
            Hello {profile.fullName}
          </Link>
          </Typography>
       <Image
                  src={typeof profileImage === "string" ? profileImage : user}
                  alt="user"
                  width={40}
                  height={40}
                  style={{ borderRadius: "65px", border: "2px solid white" }}
                  unoptimized
                />
        
          <DropDown/>
       

          
        </Box>
      </Box>
    </div>
  );
}
