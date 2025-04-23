"use client";
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
import sign from "../../public/sign.jpeg";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Signin() {
  const router = useRouter();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event)

    if (!validateInputs()) {
      return;
    }
  
    const data = new FormData(event.currentTarget);

    const response = await axios.post(
      "https://api.staging.springprod.com/auth/v1/manager/sign-in",
      {
        email: data.get("email"),
        password: data.get("password"),
      }
    );

    console.log("API Response:", response);

    const token = response.data.data.accessToken.value;
    localStorage.setItem("token", token);

    router.push("/profile");
  }

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

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
          height: "600px",
          width: "640px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          position: "absolute",
          top: "60px",
          left: 700,
          boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "450px",
            width: "550px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            top: "46px",
            left: "40px",
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
            WELCOME BACK
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
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link
                href="/otpverify"
                variant="body2"
                sx={{ alignSelf: "baseline", color: "#00308F" }}
              >
                Sign in via OTP
              </Link>

              <Link
                href="/forgotpassword"
                variant="body2"
                sx={{ alignSelf: "baseline", color: "#00308F" }}
              >
                Forgot password?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                padding: "16px 24px",
                backgroundColor: "#2b5bc7",
              }}
            >
              Sign In
            </Button>
            <Divider>OR</Divider>

            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <span>
                <Link
                  href="/signup"
                  variant="body2"
                  sx={{ alignSelf: "center" }}
                >
                  Sign up
                </Link>
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
