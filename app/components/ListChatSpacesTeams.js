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
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid
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

export default function ListChatSpacesTeamCard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.staging.springprod.com/core/v1/teams/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("competitions", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => console.log("Error fetching", error));
  }, []);

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
        height:"150vh",
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
            Teams
          </Typography>
          <Typography sx={{ fontSize: isMobile ? 16 : 20, color: "gray" }}>
            Page description
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/team-data">
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
            href="/add-teams"
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
      </Box>

      <Grid container spacing={isMobile ? 2 : isTablet ? 3 : 4} sx={{ width: "100%", p: 2 }}>
  {paginatedData.map((row, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card
        sx={{
          width: "80%",
          height: isMobile ? 180 : isTablet ? 200 : 200,
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          p: 1,
        }}
      >
        <CardMedia
          component="img"
          image={row.lmLogo}
          alt={row.name}
          sx={{
            width: "100%",
            height: isMobile ? 90 : isTablet ? 100 : 120,
            objectFit: "contain",
            borderRadius: "10px",
            mb: 1,
          }}
        />
        <CardContent sx={{ textAlign: "center", p: 1 }}>
          <Typography
            gutterBottom
            sx={{ fontSize: isMobile ? "13px" : isTablet ? "14px" : "15px" }}
          >
            {row.name}
          </Typography>
          <Typography
            gutterBottom
            sx={{ fontSize: isMobile ? "11px" : "12px", color: "gray" }}
          >
            {row.teamAlias}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>



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
