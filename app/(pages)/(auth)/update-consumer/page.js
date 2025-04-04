"use client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function UpdateConsumer() {
  const searchParams = useSearchParams();
  const consumerId = searchParams.get("id");
  const router = useRouter();

  const [consumerData, setConsumerData] = useState({
    consumerName: "",
    latestAndroidVersion: "",
    minimumAndroidVersion: "",
    latestIosVersion: "",
    minimumIosVersion: "",
    webSdkUrl: "",
  });

 useEffect(() => {
     const token = localStorage.getItem("token");

     const fetConsumersData = 
     axios
       .get(`https://api.staging.springprod.com/auth/v1/consumer/${consumerId}`, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       })
       .then((response) => {
         console.log(response.data.data);
         setData(response.data.data);
       })
       .catch((error) => console.error("Error fetching consumers:", error));

       fetConsumersData
   }, [consumerId,router]);

  const handleChange = (event) => {
    setConsumerData({
      ...consumerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please log in.");
      router.push("/login");
      return;
    }

    try {
      const response = await axios.put(
        `https://api.staging.springprod.com/auth/v1/consumer/${consumerId}`,
        consumerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response", response);
      alert("Consumer updated successfully!");
      router.push("/consumers");
    } catch (error) {
      console.error("Error updating consumer:", error);
      alert("Failed to update consumer.");
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
          Update Consumer
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
            label="Minimum Android Version"
            name="minimumAndroidVersion"
            value={consumerData.minimumAndroidVersion}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Latest iOS Version"
            name="latestIosVersion"
            value={consumerData.latestIosVersion}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Minimum iOS Version"
            name="minimumIosVersion"
            value={consumerData.minimumIosVersion}
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Consumer
          </Button>
        </form>
      </Box>
    </Container>
  );
}
