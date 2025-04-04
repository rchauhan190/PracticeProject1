"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Link,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
// import EditSquareIcon from '@mui/icons-material/EditSquare';

export default function CompetitionsDetailsCard() {
  const searchParams = useSearchParams();
  const competitionId = searchParams.get("id");
  const [competitionData, setCompetitionData] = useState([]);
  const router = useRouter();
  const theme = useTheme();
  const mode = theme.palette.mode;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `https://api.staging.springprod.com/core/v1/competitions/${competitionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("API Response:", response.data);
        setCompetitionData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching competition details:", error);
        setLoading(false);
      });
  }, [competitionId]);

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
            {competitionData.name}
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
          height: "750px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mb: 5,
          position: "relative",
          top: "20px",
          // bgcolor:"red"
        }}
      >
        <Box
          sx={{
            width: "1300px",
            height: "500px",
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
                gap: "37px",
                color: "gray",
              }}
            >
              Competition Name <span>{competitionData.name}</span>
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
                gap: "168px",
                color: "gray",
              }}
            >
              ID <span>{competitionData.competitionId}</span>
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
                gap: "88px",
                color: "gray",
              }}
            >
              Short Name <span>{competitionData.knownName}</span>
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
                gap: "100px",
                color: "gray",
              }}
            >
              LM Colour <span>{competitionData.lmColor}</span>
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
                gap: "105px",
                color: "gray",
              }}
            >
              DM Color <span>{competitionData.dmColor}</span>
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
                gap: "105px",
                color: "gray",
                gap: "100px",
              }}
            >
              Start Date <span>{competitionData.createdAt}</span>
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
                gap: "106px",
                color: "gray",
              }}
            >
              End Date <span>{competitionData.deletedAt}</span>
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
                gap: "100px",
                color: "gray",
              }}
            >
              LM Image <span>{competitionData.lmLogo}</span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            position: "relative",
            top: "-10px",
          }}
        >
          <Card sx={{ width: "200px", height: "200px", borderRadius: "15px" }}>
            <CardMedia
              component="img"
              height="220px"
              image={competitionData.dmLogo}
              alt={competitionData.name}
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

          <Card sx={{ width: "200px", height: "200px", borderRadius: "15px" }}>
            <CardMedia
              component="img"
              height="220px"
              image={competitionData.lmLogo}
              alt={competitionData.name}
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
