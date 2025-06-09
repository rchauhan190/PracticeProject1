import React, { useState } from "react";
import { Drawer, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

export default function ChatSignIn({ open, onClose }) {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const consumerId = "2a399bb3-853f-4402-b747-e6662b7170ec";
  const consumerSecret =
    "SCSK:wNSbyvUOyzTjDlWjivYniTlmb6VmkbaTmIebAAcBSupcEdEelRWWyKa2zzfWbr";

  const deviceToken =
    "TOKEN HERE erbfjkefj o23hgeop2 gjep2t tgh2eiop42gh 24toihgopi24 hgp2o4ihg tpi42hgpi4h gp423thgpi2hgp23ighp2ghp23io4h gtpi24hph42t ph24 gph24gt h42g pi42hgtpih g42ph24gt pihg pi2ehg p2gth n24etgphi";

  const handleSendOtp = async () => {
    try {
      setLoading(true);

      const payload = {
        countryName: "IN",
        countryCode: "+91",
        phoneNumber: phone,
        consumerId,
        consumerSecret,
        referenceId: "lsRef1",
        refPlatformId: "1",
      };

      const res = await axios.post(
        "https://api.staging.springprod.com/auth/v1/user/send-otp",
        payload
      );

      console.log("OTP sent:", res.data);

      // Save deviceToken in localStorage
      localStorage.setItem("deviceToken", deviceToken);

      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
  
      const payload = {
        countryName: "IN",
        countryCode: "+91",
        phoneNumber: phone,
        consumerId,
        consumerSecret,
        referenceId: "lsRef1",
        refPlatformId: "1",
        otpCode: otp,
        deviceType: "WEB",
        deviceToken: localStorage.getItem("deviceToken"),
      };
  
      const res = await axios.post(
        "https://api.staging.springprod.com/auth/v1/user/verify-otp",
        payload
      );
  
      // Extract tokens and expiry from the response data
      const {
        accessToken: { value: accessToken, expiry: accessTokenExpiry },
        refreshToken: { value: refreshToken, expiry: refreshTokenExpiry },
      } = res.data.data;
  
      // Save all tokens and expiry to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("accessTokenExpiry", accessTokenExpiry.toString());
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("refreshTokenExpiry", refreshTokenExpiry.toString());
  
      console.log("Tokens saved to localStorage");
  
      onClose();
    } catch (error) {
      console.error("OTP verification failed:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 280, p: 2 },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Sign In
      </Typography>

      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        sx={{ mb: 2 }}
        disabled={otpSent || loading}
      />

      {otpSent ? (
        <>
          <TextField
            label="Enter OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleVerifyOtp}
            disabled={loading || !otp}
          >
            {loading ? "Verifying..." : "Verify & Sign In"}
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          fullWidth
          onClick={handleSendOtp}
          disabled={loading || !phone}
        >
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      )}
    </Drawer>
  );
}
