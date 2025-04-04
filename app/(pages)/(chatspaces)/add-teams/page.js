"use client";

import {
  Box,
  Button,
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


export default function AddTeam() {
  const router = useRouter();
  const [consumers, setConsumers] = useState([]);
  const [competition, setCompetition] = useState([]);
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedSportsTeam, setSelectedSportsTeam] = useState("");
  const [selectedConsumers, setSelectedConsumers] = useState([]);
  const [sportsTeam, setSportsTeam] = useState([]);

  const [teamData, setTeamData] = useState({
    competitionId: "",
    spTeamId: "",
    isCompetition: false,
  
    teamChatName: "",
    name:"",


    consumerIds: [],

    
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Authentication token missing. Please log in.");
          return;
        }

        const competitionsResponse = await axios.get(
          "https://api.staging.springprod.com/core/v1/competitions",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("competition", competitionsResponse);
        setCompetition(competitionsResponse.data.data);

        const teamsResponse = await axios.get(
          "https://api.staging.springprod.com/core/v1/teams/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("teams", teamsResponse);
        setSportsTeam(teamsResponse.data.data);

        const consumersResponse = await axios.get(
          "https://api.staging.springprod.com/auth/v1/consumer/",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("consumers response", consumersResponse);
        setConsumers(consumersResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCompetitionChange = (e) => {
    const competitionId = e.target.value;
    const selectedComp = competition.find((comp) => comp.competitionId === competitionId);
  
    setSelectedCompetition(competitionId);
  
    setTeamData((prev) => ({
      ...prev,
      competitionId,
      spCompetitionId: selectedComp ? selectedComp.spCompetitionId : "", 
    }));
  };
  
  
  const handleSportsTeamChange = (e) => {
    const teamId = e.target.value;
    const selectedTeam = sportsTeam.find((team) => team.spTeamId === teamId);
  
    setSelectedSportsTeam(teamId);
  
    setTeamData((prev) => ({
      ...prev,
      spTeamId: teamId,
      name: selectedTeam ? selectedTeam.name : "", 
      teamChatName: selectedTeam ? selectedTeam.teamChatname : "",
    }));
  };
  

  const handleConsumerChange = (e) => {
    const selectedValues = e.target.value;
    setSelectedConsumers(selectedValues);

    setTeamData((prev) => ({
      ...prev,
      consumerIds: selectedValues,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeamData((prev) => ({
      ...prev,
      [name]:
        name === "isCompetition" || name === "isTeamChatEnabled"
          ? value === "true"
          : name === "consumerIds"
          ? value.split(",").map((id) => id.trim())
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teamPayload = {
      ...teamData,
      spCompetitionId: selectedCompetition,
      
    };

    console.log("Selected Competition ID:", selectedCompetition);
    console.log("Team Data payload :", teamPayload);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing. Please log in.");
        return;
      }

      await axios.post(
        "https://api.staging.springprod.com/core/v1/teams/",
        teamPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          maxBodyLength: Infinity,
        }
      );

      alert("Team added successfully!");
      router.push("/team-data");
    } catch (error) {
      console.error("Error adding team:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Failed to add team."}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "gray", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "50px auto",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
          Add Team
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Competition</InputLabel>
            <Select
              value={selectedCompetition}
              onChange={handleCompetitionChange}
            >
              {competition.map((comp) => (
                <MenuItem key={comp.competitionId} value={comp.competitionId}>
                  {comp.knownName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Sp Competition Id</InputLabel>
            <Select
              value={selectedCompetition}
              onChange={handleCompetitionChange}
            >
              {competition.map((comp) => (
                <MenuItem key={comp.competitionId} value={comp.competitionId}>
                  {comp.spCompetitionId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Competition Id</InputLabel>
            <Select
              value={selectedCompetition}
              onChange={handleCompetitionChange}
            >
              {competition.map((comp) => (
                <MenuItem key={comp.competitionId} value={comp.competitionId}>
                  {comp.competitionId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Is Competition?</InputLabel>
            <Select
              name="isCompetition"
              value={String(teamData.isCompetition)}
              onChange={handleChange}
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>

          {!teamData.isCompetition && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Team</InputLabel>
                <Select
                  value={selectedSportsTeam}
                  onChange={handleSportsTeamChange}
                >
                  {sportsTeam.map((team) => (
                    <MenuItem key={team.spTeamId} value={team.spTeamId}>
                      {team.spTeamId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Team Name</InputLabel>
                <Select
                  value={selectedSportsTeam}
                  onChange={handleSportsTeamChange}
                >
                  {sportsTeam.map((item) => (
                    <MenuItem key={item.spTeamId} value={item.spTeamId}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Team Chat Name"
                name="teamChatName"
                value={teamData.teamChatName}
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Consumers</InputLabel>
                <Select
                  multiple
                  value={selectedConsumers}
                  onChange={handleConsumerChange}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {consumers.map((item) => (
                    <MenuItem key={item.consumerId} value={item.consumerId}>
                      {item.consumerId}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Team
          </Button>
        </form>
      </Box>
    </Box>
  );
}
