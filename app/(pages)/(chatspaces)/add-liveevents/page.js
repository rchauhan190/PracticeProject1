"use client";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AddLiveEvents() {
  const router = useRouter();
  const [consumers, setConsumers] = useState([]);
  const [match, setMatch] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedConsumers, setSelectedConsumers] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState([]);
  
  const [teamData, setTeamData] = useState({
    name: "",
    spMatchId: "",
    type: "",
    description: "",
    publishDatetime: "",
    endDatetime: "",
    autoEndOnNoActivity: false,
    replacesTeamChat: true,
    consumerIds: [],
    spTeamIds: [],
  });

 
  


  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Authentication token missing. Please log in.");
          return;
        }
        const matchResponse = await axios.get(
          "https://api.staging.springprod.com/core/v1/scheduled-chats",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("match fetched",matchResponse.data.data)
        setMatch(matchResponse.data.data);

        const teamResponse = await axios.get(
          "https://api.staging.springprod.com/core/v1/teams",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("teams fetched",teamResponse.data.data)
        setTeams(teamResponse.data.data);


        const consumersResponse = await axios.get(
          "https://api.staging.springprod.com/auth/v1/consumer",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("cosumers fetched",consumersResponse.data.data)
        setConsumers(consumersResponse.data.data);
      } catch (error) {
        console.error("Error fetching consumers:", error);
      }
    };

    fetchMatches();
  }, []);

  
 

  const handleConsumerChange = (e) => {
    setSelectedConsumers(e.target.value);
  };

  const handleTeamChange = (e) => {
    setSelectedTeams(e.target.value);
  };

  const handleMatchChange = (e) => {
    const spMatchId = e.target.value;
    const selectedMatch = match?.find((comp) => comp.spMatchId === spMatchId) || {};
  
    setSelectedMatch(spMatchId);
  
    setTeamData((prev) => ({
      ...prev,
      spMatchId,
      name: selectedMatch.name || "",
      description: selectedMatch.description || "",
      endDatetime: selectedMatch.endDatetime || "",
      type: selectedMatch.type || "",
      publishDatetime: selectedMatch.publishDatetime || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prev) => ({
      ...prev,
      [name]:
        name === "publishDatetime" || name === "endDatetime"
          ? value 
          : name === "autoEndOnNoActivity" || name === "replacesTeamChat"
          ? value === "true"
          : value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamPayload = {
      ...teamData,
   
      consumerIds: selectedConsumers,
      spTeamIds: selectedTeams,
    };

    console.log("Payload to send:", teamPayload);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing. Please log in.");
        return;
      }

      await axios.post(
        "https://api.staging.springprod.com/core/v1/scheduled-chats/",
        teamPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Event added successfully!");
      router.push("/live-events");
    } catch (error) {
      console.error("Error adding event:", error);
      if (error.response) {
        alert(
          `Error: ${error.response.data.message || "Failed to add event."}`
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
          Add New Event
        </Typography>

        <form onSubmit={handleSubmit}>
           <FormControl fullWidth margin="normal">
                      <InputLabel>Select Match</InputLabel>
                      <Select
                        value={selectedMatch}
                        onChange={handleMatchChange}
                      >
                        {match.map((comp) => (
                          <MenuItem key={comp.scheduledChatId} value={comp.spMatchId}>
                            {comp.spMatchId}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
           <FormControl fullWidth margin="normal">
                      <InputLabel>Select Match</InputLabel>
                      <Select
                        value={selectedMatch}
                        onChange={handleMatchChange}
                      >
                        {match.map((comp) => (
                          <MenuItem key={comp.scheduledChatId} value={comp.spMatchId}>
                            {comp.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                   
           <FormControl fullWidth margin="normal">
                      <InputLabel>Select Match</InputLabel>
                      <Select
                        value={selectedMatch}
                        onChange={handleMatchChange}
                      >
                        {match.map((comp) => (
                          <MenuItem key={comp.scheduledChatId} value={comp.spMatchId}>
                            {comp.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
           <FormControl fullWidth margin="normal">
                      <InputLabel>Select Match</InputLabel>
                      <Select
                        value={selectedMatch}
                        onChange={handleMatchChange}
                      >
                        {match.map((comp) => (
                          <MenuItem key={comp.scheduledChatId} value={comp.spMatchId}>
                            {comp.description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
           <FormControl fullWidth margin="normal">
                      <InputLabel>Select Match</InputLabel>
                      <Select
                        value={selectedMatch}
                        onChange={handleMatchChange}
                      >
                        {match.map((comp) => (
                          <MenuItem key={comp.scheduledChatId} value={comp.spMatchId}>
                            {comp.publishDatetime}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                 
           <FormControl fullWidth margin="normal">
                      <InputLabel>Select Match</InputLabel>
                      <Select
                        value={selectedMatch}
                        onChange={handleMatchChange}
                      >
                        {match.map((comp) => (
                          <MenuItem key={comp.scheduledChatId} value={comp.spMatchId}>
                            {comp.endDatetime
                            }
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
      

          <FormControl fullWidth margin="normal">
            <InputLabel>Auto End On No Activity</InputLabel>
            <Select
              name="autoEndOnNoActivity"
              value={String(teamData.autoEndOnNoActivity)}
              onChange={handleChange}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Replaces Team Chat</InputLabel>
            <Select
              name="replacesTeamChat"
              value={String(teamData.replacesTeamChat)}
              onChange={handleChange}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Consumers</InputLabel>
            <Select
              multiple
              value={selectedConsumers}
              onChange={handleConsumerChange}
            >
              {consumers.map((item) => (
                <MenuItem key={item.consumerId} value={item.consumerId}>
                  {item.consumerName} ({item.consumerId})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Teams</InputLabel>
            <Select multiple value={selectedTeams} onChange={handleTeamChange}>
              {teams.map((item) => (
                <MenuItem key={item.teamId} value={item.teamId}>
                  {item.name} ({item.teamId})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Event
          </Button>
        </form>
      </Box>
    </Container>
  );
}
