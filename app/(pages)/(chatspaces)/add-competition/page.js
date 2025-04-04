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

export default function AddCompetition() {
  const router = useRouter();
  const [competition, setCompetition] = useState([]);
  const [selectedCompetitons, setSelectedCompetitions] = useState("");
  const [competitionData, setCompetitionData] = useState({
    spCompetitionId: "",
    name: "",
    competitionType: "",
  });

  const handleChange = (e) => {
    setCompetitionData({ ...competitionData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Auth token missing");
          return;
        }
        const response = await axios.get(
          "https://api.staging.springprod.com/statsperform/v1/competition/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Competitions fetched:", response.data.data);
        setCompetition(response.data.data);
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    };
    fetchCompetitions();
  }, []);

  const handleCompetitionChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCompetitions(selectedId);

    
    const selectedComp = competition.find(
      (item) => item.spCompetitionId === selectedId
    );

    if (selectedComp) {
      setCompetitionData({
        spCompetitionId: selectedComp.spCompetitionId,
        name: selectedComp.knownName || "", 
        competitionType: selectedComp.competitionType || "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting data:", competitionData);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing. Please log in.");
        return;
      }

      const response = await axios.post(
        "https://api.staging.springprod.com/core/v1/competitions/",
        competitionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Add response:", response.data.data);
      alert("Competition added successfully!");
      router.push("/competitions");
    } catch (error) {
      console.error("Error adding competition:", error);
      alert("Failed to add competition. Please try again.");
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
          Add New Competition
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Competition</InputLabel>
            <Select value={selectedCompetitons} onChange={handleCompetitionChange}>
              {competition.map((item) => (
                <MenuItem key={item.spCompetitionId} value={item.spCompetitionId}>
                  {item.knownName} ({item.spCompetitionId})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Competition Name"
            name="name"
            value={competitionData.name}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Competition Type"
            name="competitionType"
            value={competitionData.competitionType}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </form>
      </Box>
    </Container>
  );
}
