"use client";

import { useEffect, useState,useContext } from "react";
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
  Pagination,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeContext } from "../context/ThemeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/navigation";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ListIcon from "@mui/icons-material/List";

export default function SportsTeamDataCard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { mode } = useContext(ThemeContext);
  const itemsPerPage = 7;
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.staging.springprod.com/statsperform/v1/team/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("teams response", response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("Error fetching", error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredData.length);
  const paginatedData = filteredData.slice(startIndex - 1, endIndex);

  return (
    <Box sx={{ width: "100%", p: isMobile ? 2 : 4 ,  bgcolor: mode === "dark" ? "#121212" : "#f4f4f4",
      color: mode === "dark" ? "#ffffff" : "#000000",}}>
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "relative",
            top: "-15px",
          }}
        >
           <Link href="/listsportsteam">
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
              // minWidth: "80px",s
              fontSize: "14px",
              textTransform: "none",
              width: "95px",
              height: "45px",
            }}
          >
           Sync
        </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 3,
        }}
      >
        <TextField
          placeholder="Search Competitions"
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
              color: mode === "dark" ? "#fff" : "#2b5bc7",}} />
      </Box>

      <TableContainer
        component={Paper}
        sx={{bgcolor: mode === "dark" ? "#1A1A1A" : "#fff", maxWidth: 1500, margin: "auto", mt: 4, borderRadius: "10px" }}
      >
        <Table>
          <TableHead sx={{ height: "50px" }}>
            <TableRow sx={{bgcolor: mode === "dark" ? "gray" : "#fff",color: mode === "dark" ? "#fff" : "#000" }}>
              {["Team Name", "ID", "Lm Color", "Dm Color", "Update"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody sx={{ height: "70px" }}>
            {paginatedData.map((row,index) => (
              <TableRow key={index}  sx={{
                bgcolor: mode === "dark" ?"#2A2A2A" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
              }}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.spTeamId}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: row.lmColor || "#C80D13",
                      borderRadius: "50px",
                      px: 2,
                      py: 1,
                      textAlign: "center",
                      color: "white",
                      minWidth: "80px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {row.lmColor || "N/A"}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: row.dmColor || "#C80D13",
                      borderRadius: "50px",
                      px: 2,
                      py: 1,
                      textAlign: "center",
                      color: "white",
                      minWidth: "80px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {row.dmColor || "N/A"}
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <EditNoteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

     
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
