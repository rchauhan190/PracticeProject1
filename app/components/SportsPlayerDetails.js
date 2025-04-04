"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  InputField,
  Link,
  Card,
  CardContent,
  CardActions,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useSearchParams } from "next/navigation";
// import EditSquareIcon from '@mui/icons-material/EditSquare';

import { useRouter } from "next/navigation";

export default function PlayersDetailsCard() {
  const [playerData, setPlayerData] = useState([]);
  const searchParams = useSearchParams();
  const spPlayerId = searchParams.get("id");
  const router = useRouter();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `https://api.staging.springprod.com/statsperform/v1/team-players?spTeamId=8b523ujgl21tbc01me65q0aoh&${spPlayerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("API Response:", response);
        if (response.data && response.data.data) {
          setPlayerData(response.data.data[0]);
        } else {
          console.error("Unexpected API response format", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching player details:", error);
      });
  }, [spPlayerId]);

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
            Players
          </Typography>
          <Typography sx={{ fontSize: isMobile ? 16 : 20, color: "gray" }}>
            Page description
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            component={Link}
            href="/add-competition"
            sx={{
              color: mode === "dark" ? "gray" : "black",
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
            Back
          </Button>
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
            Save
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "1300px",
          height: "550px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mb: 5,
          position: "relative",
          top: "60px",
          // bgcolor:"red"
        }}
      >
        <Box
          sx={{
            width: "1300px",
            height: "400px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "1200px",
              height: "50px",
              border: "2px solid gray",
              borderRadius: "10px",
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.05)",
              display: "flex",
              // justifyContent:"space-between",

              textAlign: "flex-start",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                display: "flex",
                gap: "60px",
                color: "gray",
              }}
            >
              Player Name <span>{playerData.firstName}</span>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "1200px",
              height: "50px",
              border: "2px solid gray",
              borderRadius: "10px",
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.05)",
              display: "flex",
              // justifyContent:"space-between",

              textAlign: "flex-start",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                display: "flex",
                gap: "56px",
                color: "gray",
              }}
            >
              Known Name <span>{playerData.lastName}</span>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "1200px",
              height: "50px",
              border: "2px solid gray",
              borderRadius: "10px",
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.05)",
              display: "flex",
              // justifyContent:"space-between",

              textAlign: "flex-start",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                display: "flex",
                gap: "144px",
                color: "gray",
                gap: "148px",
              }}
            >
              ID<span>{playerData.spPlayerId}</span>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "1200px",
              height: "50px",
              border: "2px solid gray",
              borderRadius: "10px",
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.05)",
              display: "flex",
              // justifyContent:"space-between",

              textAlign: "flex-start",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                display: "flex",
                gap: "120px",
                color: "gray",
              }}
            >
              Team <span>{playerData.spPlayerId}</span>
            </Typography>
          </Box>
          <Box
            sx={{
              width: "1200px",
              height: "50px",
              border: "2px solid gray",
              borderRadius: "10px",
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.05)",
              display: "flex",
              // justifyContent:"space-between",

              textAlign: "flex-start",
              alignItems: "center",
              paddingLeft: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "18px",
                display: "flex",
                gap: "75px",
                color: "gray",
              }}
            >
              Image URL <span>{playerData.imageUrl}</span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            position: "relative",
            top: "27px",
          }}
        >
          <Card sx={{ width: "250px", height: "250px", borderRadius: "15px" }}>
            <CardMedia
              component="img"
              height="250px"
              image={playerData.imageUrl}
              alt={playerData.name}
              // sx={{
              //   padding:"7px 40px" ,

              // }}
            />
            <CardContent>
              <Typography gutterBottom sx={{ fontSize: "15px" }}>
                {/* {row.name}  */}
              </Typography>
              <Typography gutterBottom sx={{ fontSize: "12px" }}>
                {/* {row.competitionType}  */}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
