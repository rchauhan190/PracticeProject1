"use client";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import axios from "axios";
import Image from "next/image";
import user from "../../public/user.jpg";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

export default function ProfileUi() {
  const [profile, setProfile] = useState("");
  const [profileImage, setProfileImage] = useState(user);

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

    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

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
            src={typeof profileImage === "string" ? profileImage : user}
            alt="user"
            width={130}
            height={130}
            style={{ borderRadius: "65px", border: "2px solid white" }}
            unoptimized
          />

          <Typography variant="h5" sx={{ margin: "10px", color: "#fff" }}>
            {profile.fullName}
          </Typography>
        </Box>
        <Link href="/edit-profile">
          <IconButton sx={{ color: "#fff", marginLeft: "10px" }}>
            <EditIcon />
          </IconButton>
        </Link>
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
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              placeholder={profile.email}
              name="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Mobile number</FormLabel>
            <TextField
              name="mobile"
              required
              fullWidth
              placeholder={profile.phoneNumber}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="fathername">Father's Name/Guardian </FormLabel>
            <TextField
              required
              fullWidth
              name="fathername"
              placeholder="some one "
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="address">Address</FormLabel>
            <TextField
              required
              fullWidth
              placeholder={profile.countryName}
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
        <Typography variant="h5">Institute details</Typography>

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
    </Box>
  );
}
