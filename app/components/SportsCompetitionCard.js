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
  Link,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useRouter } from "next/navigation";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ListIcon from "@mui/icons-material/List";

export default function SportsCompetitionCard() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();
  const mode = theme.palette.mode;
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const fetchCompetitions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login...");
        router.push("/login");
        return;
      }

      const response = await axios.get(
        "https://api.staging.springprod.com/statsperform/v1/competition/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching competitions", error);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSync = async () => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("No token found. Redirecting to login...");
        router.push("/login");
        return;
      }
  
      setLoading(true);
  
      await axios.post(
        "https://api.staging.springprod.com/statsperform/v1/competition/sync",
      
        {
          headers: {
            "X-Secret-Key": token, 
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Sync Successful");
      fetchCompetitions();
  
    } catch (error) {
      console.error("Sync Failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: mode === "dark" ? "#121212" : "#f4f4f4",
        color: mode === "dark" ? "#ffffff" : "#000000",
        p: isMobile ? 2 : 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: isMobile ? 2 : "20px",
          }}
        >
          <Typography sx={{ fontSize: isMobile ? 28 : 40, fontWeight: "bold" }}>
            Competitions
          </Typography>
          <Typography sx={{ fontSize: isMobile ? 16 : 20, color: "gray" }}>
            Page description
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            position: "relative",
            top: "-15px",
          }}
        >
          <Link href="/listsportscompetition">
            <ListIcon
              sx={{
                fontSize: 28,
                cursor: "pointer",
                color: mode === "dark" ? "#fff" : "black",
              }}
            />
          </Link>
          <Button
            
            onClick={handleSync}
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
          flexDirection: "column",
          height: "800px",
          justifyContent: isMobile ? "center" : "flex-start",
          px: isMobile ? 2 : "10px",
          py: isMobile ? 2 : 5,
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
        >
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
          <FilterAltIcon />
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
            <TableHead sx={{ height: "50px" }}>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: mode === "dark" ? "gray" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Competition Name
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: mode === "dark" ? "gray" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: mode === "dark" ? "gray" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Lm Color
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: mode === "dark" ? "gray" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Dm Color
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: mode === "dark" ? "gray" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Start Date
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: mode === "dark" ? "gray" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  End Date
                </TableCell>
                <TableCell
                  sx={{
                    bgcolor: mode === "dark" ? "gray" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  Update
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ height: "70px" }}>
              {filteredData.map((row) => (
                <TableRow
                  key={row.spCompetitionId}
                  sx={{
                    bgcolor: mode === "dark" ? "#2A2A2A" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                    fontWeight: "bold",
                  }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.spCompetitionId}</TableCell>
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
                    {row.tournamentCalendars?.[0]?.startDate || "N/A"}
                  </TableCell>
                  <TableCell>
                    {row.tournamentCalendars?.[0]?.endDate || "N/A"}
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
                    colSpan={7}
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
    </Box>
  );
}
