"use client";
import {
  Link,
  Box,
  TextField,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
  Paper,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Consumers() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [androidVersionFilter, setAndroidVersionFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://api.staging.springprod.com/auth/v1/consumer/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => console.error("Error fetching consumers:", error));
  }, []);

  const handleConsumerDelete = async (consumerId) => {
    if (!window.confirm("Are you sure you want to delete this consumer?")) {
      return;
    }

    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://api.staging.springprod.com/auth/v1/consumer/${consumerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Deleted response", response);
    alert("Consumer deleted successfully!");

    setData(data.filter((item) => item.consumerId !== consumerId));
  };

  const handleUpdate = (item) => {
    router.push(`/update-consumer?id=${item.consumerId}`);
  };

  const filteredData = data.filter(
    (row) =>
      (row.consumerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.consumerId.toString().includes(searchTerm) ||
        row.latestAndroidVersion
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (androidVersionFilter === "" ||
        row.latestAndroidVersion === androidVersionFilter)
  );
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleSortByName = () => {
    let sortedData = [...data];

    if (sortOrder === "asc") {
      sortedData.sort((a, b) => a.consumerName.localeCompare(b.consumerName));
      setSortOrder("desc");
      sortedData.sort((a, b) => b.consumerName.localeCompare(a.consumerName));
      setSortOrder("asc");
    }

    setData(sortedData);
  };

  const handleOpenQuickView = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCloseQuickView = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ width: "1450px" }}>
      <Box
        sx={{
          backgroundColor: "#ffffff",
          height: "900px",
          position: "relative",
          top: "23px",
          borderRadius: "25px",
          left: "20px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#2b5bc7",
            height: "200px",
            position: "relative",
            top: "40px",
            borderRadius: "25px",
            left: "48px",
            width: "1330px",
            boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            sx={{
              fontWeight: "bold",
              width: "100%",
              fontSize: "clamp(2rem, 10vw, 2.15rem)",
              position: "relative",
              top: "30px",
              color: "#ffffff",
            }}
          >
            Consumers List
          </Typography>
          <Box
            sx={{
              width: "1330px",
              height: "100px",
              position: "relative",
              left: "50px",
              top: "70px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TextField
                placeholder="Search"
                sx={{
                  width: "200px",
                  color: "#fff",
                  height: "10px",
                  width: "200px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              {/* Android Version Filter */}
              <Select
                value={androidVersionFilter}
                onChange={(e) => setAndroidVersionFilter(e.target.value)}
                displayEmpty
                sx={{ width: "200px", borderRadius: "50px" }}
              >
                <MenuItem value="">All Versions</MenuItem>
                {[
                  ...new Set(data.map((item) => item.latestAndroidVersion)),
                ].map((version) => (
                  <MenuItem key={version} value={version}>
                    {version}
                  </MenuItem>
                ))}
              </Select>
              {/* Sort Button */}
              <Button
                sx={{
                  borderRadius: "50px",
                  color: "#2b5bc7",
                  backgroundColor: "white",
                }}
                variant="contained"
                onClick={handleSortByName}
              >
                Sort by Name {sortOrder === "asc" ? "⬆️" : "⬇️"}
              </Button>

              <Link
                href="/add-consumer"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  textDecoration: "none",
                }}
              >
                <Button
                  sx={{
                    borderRadius: "50px",
                    color: "#2b5bc7",
                    backgroundColor: "white",
                  }}
                  variant="contained"
                >
                  Add Consumer
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#ffffff",
            width: "1330px",
            height: "400px",
            position: "relative",
            left: "50px",
            top: "40px",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxWidth: 1600,
              height: 500,
              margin: "auto",
              mt: 10,
              borderRadius: "25px",
              position: "relative",
              top: "-50px",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#2b5bc7" }}>
                  <TableCell sx={{ color: "white" }}>ID</TableCell>
                  <TableCell sx={{ color: "white" }}>Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Android Version</TableCell>
                  <TableCell sx={{ color: "white" }}>Created On </TableCell>
                  <TableCell sx={{ color: "white" }}>Status</TableCell>
                  <TableCell sx={{ color: "white" }}>Web URL</TableCell>
                  <TableCell sx={{ color: "white" }}>Details </TableCell>
                  <TableCell sx={{ color: "white" }}>Update </TableCell>
                  <TableCell sx={{ color: "white" }}>Delete </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.consumerName}</TableCell>
                    <TableCell>{row.latestAndroidVersion}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.isActive ? "Online" : "Offline"}
                        color={row.isActive ? "success" : "error"}
                      />
                    </TableCell>
                    <TableCell>
                      {
                        <Link href={row.webSdkUrl}>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: "#2b5bc7",
                              borderRadius: "20px",
                            }}
                          >
                            Go to Page
                          </Button>
                        </Link>
                      }
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#2b5bc7",
                          borderRadius: "20px",
                        }}
                        onClick={() => handleOpenQuickView(row)}
                      >
                        Quick View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleUpdate(row)}
                        variant="contained"
                        sx={{
                          backgroundColor: "#2b5bc7",
                          borderRadius: "20px",
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        onClick={() => handleConsumerDelete(row.consumerId)}
                        variant="contained"
                        sx={{
                          backgroundColor: "#2b5bc7",
                          borderRadius: "20px",
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          />

          <Dialog open={open} onClose={handleCloseQuickView}>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
              {selectedUser && (
                <Box sx={{ padding: 2 }}>
                  <Typography>
                    <strong>Name:</strong> {selectedUser.consumerName}
                  </Typography>
                  <Typography>
                    <strong>ID:</strong> {selectedUser.consumerId}
                  </Typography>
                  <Typography>
                    <strong> Latest Android Version:</strong>{" "}
                    {selectedUser.latestAndroidVersion}
                  </Typography>
                  <Typography>
                    <strong> Minnimum Android Version:</strong>{" "}
                    {selectedUser.minimumAndroidVersion}
                  </Typography>
                  <Typography>
                    <strong>Latest Ios Version:</strong>{" "}
                    {selectedUser.latestIosVersion}
                  </Typography>
                  <Typography>
                    <strong>Web Url:</strong> {selectedUser.webSdkUrl}
                  </Typography>
                  <Typography>
                    <strong>Created on:</strong> {selectedUser.createdAt}
                  </Typography>
                  <Typography>
                    <strong>Updated on:</strong> {selectedUser.updatedAt}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseQuickView}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}
