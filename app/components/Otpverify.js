import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import otp from "../../public/otp.png";

export default function Otpverify() {
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
        boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.3)"
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
        <Image src={otp} alt="Profile Picture" width={600} height={570} />
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
          boxShadow: "1px 1px 8px rgba(0, 0, 0, 0.3)"
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
            OTP Verification
          </Typography>
          <Typography textAlign="center">
            A 4-digit confirmation code has been sent to <br/>  ******5799
            <Link href="/">Change </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <TextField
              required
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{ width: "50px" }}
            />
            <TextField
              required
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{ width: "50px" }}
            />
            <TextField
              required
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{ width: "50px" }}
            />
            <TextField
              required
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
              sx={{ width: "50px" }}
            />
           
          </Stack>
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
            submit
          </Button>
          <Link position="relative" left="200px" href="/">Resend OTP</Link>
        </Box>
      </Box>
    </Box>
  );
}
