"use client";
import {
  Box,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function UpdateChat() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");
  



  const [chatData, setChatData] = useState({
    name: "",
    spMatchId: "",
    type: "",
    description: "",
    publishDatetime: "",
    endDatetime: "",
    autoEndOnNoActivity: false,
    replacesTeamChat: true,
   
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!eventId) {
        console.error("Error: Invalid event Id received.");
        alert("Invalid evet ID. Please try again.");
        router.push("/live-events");
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Authentication token missing. Please log in.");
          return;
        }
        const matchResponse = await axios.get(
          `https://api.staging.springprod.com/core/v1/scheduled-chats/${eventId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("update match  fetched", matchResponse.data.data);
        setChatData(matchResponse.data.data);


        const consumersResponse = await axios.get(
            "https://api.staging.springprod.com/auth/v1/consumer",
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          console.log("cosumers fetched",consumersResponse.data.data)
          setConsumers(consumersResponse.data.data);


          const teamResponse = await axios.get(
            "https://api.staging.springprod.com/core/v1/teams",
            { headers: { Authorization: `Bearer ${token}` } }
          );
  
          console.log("teams fetched",teamResponse.data.data)
          setTeams(teamResponse.data.data);


       
      } catch (error) {
        console.error("Error fetching consumers:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChatData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing. Please log in.");
        return;
      }
  

    const {scheduledChatId, chatStatus, isDeleted, createdAt, updatedAt,spMatchId,description, spTeamIds, consumerIds, ...cleanData } = chatData;
  
    const teamPayload = {
      ...cleanData, 
    
    };
  
    try {
      
    console.log("Payload to send:", teamPayload);
  
      
  
      await axios.put(
        `https://api.staging.springprod.com/core/v1/scheduled-chats/${eventId}`,
        teamPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      alert("Event updated successfully!");
      router.push("/live-events");
    } catch (error) {
      console.error("Error updating event:", error);
      if (error.response) {
        alert(
          `Error: ${error.response.data.message || "Failed to update event."}`
        );
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
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
          Update Chat
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={chatData.name}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
                readOnly: true,
              }}
          />

          <TextField
            fullWidth
            label="Match Id"
            name="spMatchId"
            value={chatData.spMatchId}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            label="Type"
            name="type"
            value={chatData.type}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={chatData.description}
            onChange={handleChange}
            margin="normal"
            required
          
          />
          <TextField
            fullWidth
            label="Published date"
            name="publishDatetime"
            value={chatData.publishDatetime}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            label="End Date time"
            name="endDatetime"
            value={chatData.endDatetime}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Auto End On No Activity</InputLabel>
            <Select
              name="autoEndOnNoActivity"
              value={String(chatData.autoEndOnNoActivity)}
              onChange={handleChange}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Replaces TeamChat</InputLabel>
            <Select
              name="replacesTeamChat"
              value={String(chatData.replacesTeamChat)}
              onChange={handleChange}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Container>
  );
}
