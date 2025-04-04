"use client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function UpdateTeam() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");

  const [teamData, setTeamData] = useState({
    competitionId: "",
    isCompetition: false,
    spCompetitionId: "",
    spTeamId: "",
    teamChatName: "",
    name: "",
    consumerIds: [],
    // updatedAt: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      router.push("/login");
      return;
    }

    if (!teamId) {
      alert("No team ID provided!");
      router.push("/team-data");
      return;
    }

    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          `https://api.staging.springprod.com/core/v1/teams/${teamId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Fetched response", response.data);
        setTeamData(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
        alert("Failed to fetch team data.");
      }
    };

    fetchTeamData();
  }, [teamId, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamData((prevData) => ({
      ...prevData,
      [name]: name === "isCompetition" ? value === "true" : value,
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please log in.");
      router.push("/login");
      return;
    }

   
    const { lmLogo, dmLogo, lmColor, dmColor, enabledAt,teamId, disabledAt,updatedAt, createdAt, ...sendData } = teamData;

    // sendData.updatedAt = new Date().getTime();


    console.log("Data being sent to API:", sendData);

    try {
      const response = await axios.put(
        `https://api.staging.springprod.com/core/v1/teams/${teamId}`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update response", response);
      alert("Team updated successfully!");
      router.push("/team-data");
    } catch (error) {
      console.error("Error updating team:", error.response?.data || error.message);
      alert("Failed to update team.");
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
          Update Team
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Competition ID"
            name="competitionId"
            value={teamData.competitionId || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="SP Competition ID"
            name="spCompetitionId"
            value={teamData.spCompetitionId || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="SP Team ID"
            name="spTeamId"
            value={teamData.spTeamId || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Team Name"
            name="name"
            value={teamData.name || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Team Chat Name"
            name="teamChatName"
            value={teamData.teamChatName || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          {/* <TextField
            fullWidth
            label="Updated at"
            name="updatedAt"
            value={teamData.updatedAt || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          /> */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </form>
      </Box>
    </Container>
  );
}
