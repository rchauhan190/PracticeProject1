import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import forgotpass from "../../public/forgotpass.png";

export default function ForgetPass() {
  return (
    <Box
      sx={{
        display: "flex",

        position: "absolute",
        top: 125,
        left: 150,
        zIndex: 2,
        width: "1400px",
        height: "700px",
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
          height: "600px",
          width: "570px",
          position: "relative",
          left: "50px",
        }}
      >
        <Image
          src={forgotpass}
          alt="Profile Picture"
          width={600}
          height={550}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
          height: "500px",
          width: "650px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          position: "absolute",
          top: "115px",
          left: 700,
          boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "300px",
            width: "500px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            top: "100px",
            left: "25px",
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
            Forgot password
          </Typography>
          <Typography textAlign="center">
            Enter your email,we"ll share you intructions to <br/> reset your password
          </Typography>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              name="email"
              required
              sx={{ width: "500px" }}
              placeholder="Enter Email"
            />
          </FormControl>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: "#2b5bc7",
              height: "52px",
              borderRadius: "8px",
              color: "#fff",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
