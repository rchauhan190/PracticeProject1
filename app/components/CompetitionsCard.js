"use client";

import { useEffect, useState } from "react";
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
  Stack,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ListIcon from "@mui/icons-material/List";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

export default function CompetitionsCard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.staging.springprod.com/core/v1/competitions/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })

      .catch((error) => console.log("Error fetching", error));
  }, []);

  const handleCompetitionDelete = async (competitionId) => {
    if (!window.confirm("Are you sure you want to delete this competition?"))
      return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://api.staging.springprod.com/core/v1/competitions/${competitionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Competition deleted successfully!");
      setData((prevData) =>
        prevData.filter((item) => item.competitionId !== competitionId)
      );
    } catch (error) {
      console.error("Error deleting competition", error);
      alert("Failed to delete competition.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (row) =>
    router.push(`/update-competitions?id=${row.competitionId}`);

  const handleDetails = (competitionId) => {
    router.push(`/chatspacescompetitiondetail?id=${competitionId}`);
  };

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

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
        boxShadow:
          mode === "dark"
            ? "0px 4px 10px rgba(255, 255, 255, 0.1)"
            : "10px 10px 20px rgba(0, 0, 0, 0.2)",
        border: mode === "dark" ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box sx={{ px: isMobile ? 2 : "20px" }}>
          <Typography sx={{ fontSize: isMobile ? 28 : 40, fontWeight: "bold" }}>
            Competitions
          </Typography>
          <Typography sx={{ fontSize: isMobile ? 16 : 20, color: "gray" }}>
            Page description
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/listchatcompitition">
            <ListIcon
              sx={{
                fontSize: 28,
                cursor: "pointer",
                color: mode === "dark" ? "#fff" : "black",
              }}
            />
          </Link>
          <Button
            component={Link}
            href="/add-competition"
            sx={{
              bgcolor: mode === "dark" ? "gray" : "#2b5bc7",
              color: "white",
              borderRadius: "10px",
              px: 2,
              height: "36px",
              // minWidth: "80px",
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <TextField
          placeholder="Search Competitions"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: isMobile ? "100%" : "400px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              bgcolor: mode === "dark" ? "#222" : "#fff",
              color: mode === "dark" ? "#fff" : "#000",
            },
          }}
        />
        <FilterAltIcon
          sx={{
            color: mode === "dark" ? "#fff" : "#2b5bc7",
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
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
            <TableRow
              sx={{
                bgcolor: mode === "dark" ? "gray" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
              }}
            >
              <TableCell
                sx={{
                  color: mode === "dark" ? "#fff" : "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Competition
              </TableCell>
              <TableCell
                sx={{
                  color: mode === "dark" ? "#fff" : "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{
                  color: mode === "dark" ? "#fff" : "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  color: mode === "dark" ? "#fff" : "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Update
              </TableCell>
              <TableCell
                sx={{
                  color: mode === "dark" ? "#fff" : "black",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.competitionId}
                sx={{
                  bgcolor: mode === "dark" ? "#2A2A2A" : "#fff",
                  color: mode === "dark" ? "#fff" : "#000",
                }}
              >
                <TableCell>
                  <Typography
                    component="span"
                    onClick={() => handleDetails(row.competitionId)}
                    sx={{
                      cursor: "pointer",
                      textDecoration: "none !important",
                      color: mode === "dark" ? "#fff" : "#000",
                      "&:hover": { textDecoration: "none !important" },
                      display: "inline",
                    }}
                  >
                    {row.name}
                  </Typography>
                </TableCell>

                <TableCell>{row.competitionType}</TableCell>
                <TableCell>{row.competitionId}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleUpdate(row)}
                    sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                  >
                    <EditNoteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleCompetitionDelete(row.competitionId)}
                    disabled={loading}
                    sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Typography
          component="span"
          sx={{ fontSize: "14px", color: mode === "dark" ? "#fff" : "gray" }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              bgcolor: mode === "dark" ? "gray" : "#fff",
              color: mode === "dark" ? "#fff" : "gray",
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
