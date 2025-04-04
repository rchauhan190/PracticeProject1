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
import { ThemeContext } from "../context/ThemeContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function LiveEvents() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const mode = theme.palette.mode;
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api.staging.springprod.com/core/v1/scheduled-chats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("chats response", response);
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleUpdate = (eventId) => {
    router.push(`/update-chats?id=${eventId}`);
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://api.staging.springprod.com/core/v1/scheduled-chats/${eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Event deleted successfully!");
      setData((prevData) =>
        prevData.filter((event) => event.scheduledChatId !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete the event.");
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, filteredData.length);
  const paginatedData = filteredData.slice(startIndex - 1, endIndex);

  return (
    <Box
      sx={{
        width: "100%",
        p: isMobile ? 2 : 4,
        bgcolor: mode === "dark" ? "#121212" : "#fff",
        color: mode === "dark" ? "#fff" : "#000",
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
            Scheduled Chats
          </Typography>
          <Typography sx={{ fontSize: isMobile ? 16 : 20, color: "gray" }}>
            View and manage scheduled live events.
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
          <Button
            component={Link}
            href="/add-liveevents"
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
            <AddIcon sx={{ mr: 1 }} />
            Create
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
          placeholder="Search Events"
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

          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <Box
              sx={{
                bgcolor: mode === "dark" ? "#1A1A1A" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                // border:"2px solid gray",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pl: "10px",
              }}
            >
              <FilterAltIcon
                sx={{
                  mr: 1,
                  bgcolor: mode === "dark" ? "#1A1A1A" : "#fff",
                  color: mode === "dark" ? "#fff" : "#000",
                }}
              />
            </Box>
            <Box
              sx={{
                bgcolor: mode === "dark" ? "#1A1A1A" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
                borderRadius: "8px",
                width: "150px",
                height: "40px",
                // border:"2px solid gray",
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CalendarTodayIcon sx={{ mr: 1, color: mode === "dark" ? "#fff" : "#000" }} />
              Filter by Date
            </Box>
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 1500,
            margin: "auto",
            mt: 4,
            borderRadius: "10px",
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
                {[
                  "Fixture",
                  "Status",
                  "Start Time",
                  "End Time",
                  "Update",
                  "Delete",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <TableRow key={row.scheduledChatId}  sx={{
                    bgcolor: mode === "dark" ?"#2A2A2A" : "#fff",
                    color: mode === "dark" ? "#fff" : "#000",
                  }}>
                    <TableCell
                      sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                     sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor:
                              row.chatStatus === "not_started"
                                ? "green"
                                : row.chatStatus === "live"
                                ? "red"
                                : "green",
                          }}
                        />
                        {row.chatStatus}
                      </Box>
                    </TableCell>

                    <TableCell
                      sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                    >
                      {row.publishDatetime}
                    </TableCell>
                    <TableCell
                      sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                    >
                      {row.endDatetime}
                    </TableCell>
                    <TableCell
                     sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                    >
                      <IconButton
                        onClick={() => handleUpdate(row.scheduledChatId)}
                      >
                        <EditNoteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                    >
                      <IconButton
                        onClick={() => handleDelete(row.scheduledChatId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      textAlign: "center",
                      fontSize: "18px",
                      bgcolor: mode === "dark" ? "#1A1A1A" : "#fff",
                      color: mode === "dark" ? "#fff" : "#000",
                    }}
                  >
                    No matching events found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: "24px", px: 2 }}
      >
        <Typography component="span" sx={{ fontSize: "14px", color: "gray" }}>
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              bgcolor: "#fff",
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
