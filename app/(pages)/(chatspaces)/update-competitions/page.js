"use client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { updateCompetitions } from "../../../../Services/competitions/competitionService";

export default function UpdateCompetition() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const competitionId = searchParams.get("id");

  const [competitionData, setCompetitionData] = useState({
    name: "",
    spCompetitionId: "",
    competitionType: "",
    // updatedAt:"",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      router.push("/login");
      return;
    }

    if (!competitionId) {
      alert("No competition ID provided!");
      router.push("/competitions");
      return;
    }

    const fetchCompetitionData = async () => {
      try {
        const response = await axios.get(
          `https://api.staging.springprod.com/core/v1/competitions/${competitionId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Fetched response", response);
        setCompetitionData(response.data.data || response.data);
      } catch (error) {
        console.error("Error fetching competition:", error);
        alert("Failed to fetch competition data.");
      }
    };

    fetchCompetitionData();
  }, [competitionId, router]);

  const handleChange = (e) => {
    setCompetitionData({ ...competitionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }

    const {
      knownName,
      country,
      countryCode,
      updatedAt,
      isDeleted,
      deletedAt,
      lmLogo,
      dmLogo,
      lmColor,
      dmColor,
      createdAt,
      competitionId,
      ...onlySendData
    } = competitionData;

    console.log("Submitting update:", competitionId, onlySendData);

    try {
      const response = await updateCompetitions(
        competitionId,
        onlySendData,
        token
      );
      console.log("Update success:", response);
      alert("Competition updated successfully!");
      router.push("/competitions");
    } catch (error) {
      console.error("Update failed:", error?.response?.data || error);
      alert("Failed to update competition.");
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
          Update Competition
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Competition Id"
            name="spCompetitionId"
            value={competitionData.spCompetitionId || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            fullWidth
            label="Competition Name"
            name="name"
            value={competitionData.name || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            disabled={false}
          />

          <TextField
            fullWidth
            label="Competition Type"
            name="competitionType"
            value={competitionData.competitionType || ""}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <TextField
  fullWidth
  label="Update Date"
  name="updatedAt"
  type="date"
  value={competitionData.updatedAt || ""}
  onChange={handleChange}
  margin="normal"
  required
  variant="outlined"
  InputLabelProps={{
    shrink: true, 
  }}
/> */}

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Competition
          </Button>
        </form>
      </Box>
    </Container>
  );
}
