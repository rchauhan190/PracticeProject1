"use client";

import { useEffect, useState, useContext } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Link,
  Stack,
} from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/navigation";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";

export default function TeamData() {
  const { mode } = useContext(ThemeContext);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Unauthorized! Please log in.");
          return;
        }

        const response = await axios.get(
          "https://api.staging.springprod.com/core/v1/teams/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching teams:", error);
        alert("Failed to load team data.");
      }
    };

    fetchTeams();
  }, []);

  const handleUpdate = (teamId) => {
    if (!teamId) {
      alert("Invalid team ID!");
      return;
    }
    router.push(`/update-team?id=${teamId}`);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredData.length);
  const paginatedData = filteredData.slice(startIndex - 1, endIndex);

  return (
    <Box
      sx={{
        width: "100%",
        p: isMobile ? 2 : 4,
        bgcolor: mode === "dark" ? "#121212" : "#ffffff",
        color: mode === "dark" ? "#ffffff" : "#000000",
        minHeight: "100vh",
        boxShadow: mode === "dark"
        ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
        : "10px 10px 20px rgba(0, 0, 0, 0.2)",
      border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "none", 
      }}
    >
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ px: isMobile ? 2 : "20px" }}>
          <Typography sx={{ fontSize: isMobile ? 28 : 40, fontWeight: "bold" }}>
            Teams
          </Typography>
          <Typography sx={{ fontSize: isMobile ? 16 : 20, color: "gray" }}>
            Page description
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Link  href="/listchatspacesteam" >
  <ListIcon sx={{ fontSize: 28, cursor: 'pointer',color:mode === "dark" ? "#fff" : "black",}} />
</Link>
          
          <Button
            component={Link}
            href="/add-teams"
            sx={{
              bgcolor: mode === "dark" ? "gray" : "#2b5bc7",
              color: "white",
              borderRadius: "10px",
              px: 2,
              height: "36px",
              // minWidth: "80px",s
              fontSize: "14px",
              textTransform: "none",
              width: "95px",
              height: "45px",
            }}
          >
          <AddIcon sx={{ mr: 1 }} /> Create
        </Button>
        </Box>
      </Box>

     
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search Teams"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: isMobile ? "100%" : isTablet ? "300px" : "400px",
              "& .MuiOutlinedInput-root": {
                bgcolor: mode === "dark" ? "#222" : "#fff",
                borderRadius: "10px",
                color: mode === "dark" ? "#fff" : "#000",
              },
            }}
          />
          <FilterAltIcon sx={{ 
              color: mode === "dark" ? "#fff" : "#2b5bc7",}}/>
        </Box>

        
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1500,
            margin: "auto",
            mt: 4,
            borderRadius: "10px",
            bgcolor: mode === "dark" ? "#1A1A1A" : "#fff",
          boxShadow:
            mode === "dark"
              ? "0px 4px 15px rgba(255, 255, 255, 0.1)"
              : "0px 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{bgcolor: mode === "dark" ? "gray" : "#fff",color: mode === "dark" ? "#fff" : "#000" }}>
                {["Team Name", "Alias", "Team Chat Name", "Update"].map(
                  (header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        // color: mode === "dark" ? "#fff" : "#000",
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
  {paginatedData.map((row) => (
    <TableRow
      key={row.spTeamId}
      sx={{
        bgcolor: mode === "dark" ?"#2A2A2A" : "#fff",
        // color: mode === "dark" ? "#fff" : "#000",
      }}
    >
      <TableCell>
        {row.name}
      </TableCell>
      <TableCell >
        {row.teamAlias}
      </TableCell>
      <TableCell >
        {row.teamId || "N/A"}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleUpdate(row.teamId)}>
          <EditNoteIcon  />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Pagination */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Typography component="span" sx={{ fontSize: "14px",  color:mode ==="dark"?"#fff":"gray", }}>
  <Box
    component="span"
    sx={{
      display: "inline-flex",
      bgcolor: mode==="dark"?"gray": "#fff",
      color:mode ==="dark"?"#fff":"gray",
      borderRadius: "4px",
      width: "40px",
      height: "35px",
      boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      border: "1px solid #ccc",
      mx: 1,
    }}
  >
    {startIndex}-{endIndex}
  </Box>
  of {filteredData.length}
</Typography>
<Stack direction="row" spacing={2}>
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            variant="contained"
            sx={{
              bgcolor: mode === "dark" ? "gray" : "#2b5bc7",
              color: "#fff",
            }}
          >
            Previous
          </Button>
          <Button
            disabled={page === Math.ceil(filteredData.length / itemsPerPage)}
            onClick={() => setPage(page + 1)}
            variant="contained"
            sx={{
              bgcolor: mode === "dark" ? "gray" : "#2b5bc7",
              color: "#fff",
            }}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
