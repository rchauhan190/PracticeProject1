"use client";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Image from "next/image";
import user from "../../../public/user.jpg";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";


export default function ProfileUi() {
  const [profile, setProfile] = useState("");
  const [updateProfile, setUpdateProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    address: "",
  });
  
  const [showUpdateButton, setShowUpdateButton] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.staging.springprod.com/auth/v1/manager/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfile(response.data.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const handleEditClick = () => {
    setShowUpdateButton(true);
  };

  const handleChange = (e) => {
    setUpdateProfile({ ...updateProfile, [e.target.name]: e.target.value });
  };
  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");
  
      const response = await axios.put("https://api.staging.springprod.com/auth/v1/manager/profile",
      updateProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response)=>{
        console.log("Update response:", response);
      alert("Profile updated successfully!");

      })
    
    
   
  };

  return (
    <Box
      sx={{
        direction: "flex",
        flexDirection: "row",
        width: "155vh",
        margin: "30px 0px",
        padding: "5px 20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignContent: "space-between",
          justifyContent: "space-between",
          alignItems: "flex-start",

          height: "20vh",
          backgroundColor: "#2b5bc7",
          margin: "14px",
          padding: "32px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
          //   position:"relative",
          //   top:"-25",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Image
            src={user}
            alt="user"
            width={130}
            height={130}
            style={{ borderRadius: "65px", border: "2px solid white" }}
          />
          <Typography variant="h5" sx={{ margin: "10px", color: "#fff" }}>
            {profile.fullName}
          </Typography>
        </Box>
        <IconButton onClick={handleEditClick} sx={{ color: "#fff", marginLeft: "10px" }}>
          <EditIcon />
        </IconButton>  
      </Box>
      <Box
        sx={{
          height: "30vh",
          backgroundColor: "#ffffff",
          margin: "14px",
          padding: "32px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "70px",
            margin: "0px 54px",
            padding: "0px 21px",
            position: "relative",
            top: "-12",
          }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              name="name"
              required
              fullWidth
              placeholder={profile.fullName}
              onChange={handleChange}
           
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              placeholder={profile.email}
              name="email"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Mobile number</FormLabel>
            <TextField
              name="mobile"
              required
              fullWidth
              placeholder={profile.phoneNumber}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="fathername">Father's Name/Guardian </FormLabel>
            <TextField
              required
              fullWidth
              name="fathername"
              placeholder="some one "
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <TextField
              required
              fullWidth
              placeholder={profile.countryName}
              
              onChange={handleChange}
              name="address"
            />
          </FormControl>
        </Box>
      </Box>
      <Box
        sx={{
          height: "20vh",
          backgroundColor: "#ffffff",
          margin: "14px",
          padding: "32px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
          
        }}
      >
        <Typography variant="h5" >Institute details</Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            margin: "12px 60px",
          }}
        >
          <FormControl>
            <FormLabel htmlFor="type">Institute type</FormLabel>
            <TextField
              name="type"
              required
              fullWidth
              placeholder="choose your institute"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="instituteName">Institute Name</FormLabel>
            <TextField
              required
              fullWidth
              placeholder="choose your institute name"
              name="instituteName"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="examType">Exam type</FormLabel>
            <TextField
              name="examType"
              required
              fullWidth
              placeholder="Choose your exam type"
            />
          </FormControl>
        </Box>
      </Box>
      {showUpdateButton && <Box  sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          type="update"
          sx={{ backgroundColor: "#2b5bc7", color: "#fff", width: "150px" }}
          onClick={handleUpdateProfile}
        >
          update
        </Button>
        <Button onClick={()=>setShowUpdateButton(false)} type="cancel">cancel</Button>
      </Box>}
    </Box>
  );
}
