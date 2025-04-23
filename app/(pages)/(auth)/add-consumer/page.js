"use client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {addConsumer} from "../../../../Services/consumers/consumerService"
export default function AddConsumer() {
  const router = useRouter();

  const [consumerData, setConsumerData] = useState({
    consumerName: "",
    latestAndroidVersion: "",
    minimumAndroidVersion:"",
    latestIosVersion:"",
    minimumIosVersion:"",
    webSdkUrl: "",
  });

 
  const handleChange = (e) => {
    setConsumerData({ ...consumerData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const result = await addConsumer(consumerData, token);
      console.log("Consumer added:", result);
      router.push("/consumers"); 
    } catch (error) {
      console.error("Error adding consumer:", error);
    }
    
  };

  return (
    <Container>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "50px auto",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
          Add New Consumer
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Consumer Name"
            name="consumerName"
            value={consumerData.consumerName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Latest Android Version"
            name="latestAndroidVersion"
            value={consumerData.latestAndroidVersion}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Web SDK URL"
            name="webSdkUrl"
            value={consumerData.webSdkUrl}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="minimum Android Version"
            name="minimumAndroidVersion"
            value={consumerData.minimumAndroidVersion}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="latest Ios Version"
            name="latestIosVersion"
            value={consumerData.latestIosVersion}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="minimum Ios Version"
            name="minimumIosVersion"
            value={consumerData.minimumIosVersion}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Consumer
          </Button>
        </form>
      </Box>
    </Container>
  );
}
