"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import sign from "../../public/sign.jpeg";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signupp() {
  const data = {
    name: "",
    mobile: "",
    email: "",
    password: "",
    subject: "",
    type: "",
  };
  const [inputData, setInputData] = useState(data);
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(inputData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const response = await axios.post(
        "https://api.staging.springprod.com/auth",
        inputData
      );
      console.log("api response", response.data);
      
    } catch (err) {
      console.log("api  error", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: 45,
        left: 150,
        zIndex: 2,
        width: "1400px",
        height: "840px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "651 px",
          width: "570px",
          position: "relative",
          left: "50px",
        }}
      >
        <Image src={sign} alt="Profile Picture" width={600} height={650} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-around",
          height: "780px",
          width: "650px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          position: "absolute",
          top: "20px",
          left: 700,
          boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "600px",
            width: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            top: "20px",
            left: "25px",
            // backgroundColor: "gray"
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              fontWeight: "bold",
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
            }}
          >
            Create an account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                name="name"
                required
                fullWidth
                placeholder="Someone"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Mobile Number</FormLabel>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  sx={{ width: 100, height: 50 }}
                >
                  <MenuItem value="+1">+1</MenuItem>
                  <MenuItem value="+44">+44</MenuItem>
                  <MenuItem value="+91">+91</MenuItem>
                  <MenuItem value="+61">+61</MenuItem>
                </Select>
                <TextField
                  placeholder="9988966467"
                  fullWidth
                  onChange={handleChange}
                />
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                placeholder="your@email.com"
                name="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <TextField
                required
                fullWidth
                placeholder="Maths"
                name="subject"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Exam Type</FormLabel>
              <TextField
                required
                fullWidth
                placeholder="Choose your Exam Type"
                name="examtype"
                onChange={handleChange}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            {/* <GoogleIcon />
           <FacebookIcon /> */}

            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/signin" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
