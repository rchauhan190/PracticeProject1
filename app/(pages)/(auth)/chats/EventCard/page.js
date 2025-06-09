import React from "react";
import { Box, Typography, Avatar, Grid, Button } from "@mui/material";
import useUserStore from "../../../../Store/UsersStore"

export default function EventCard({ chat, homeTeamColor, awayTeamColor })
 {
  const { users } = useUserStore();
  if (!chat) {
    return (
      <Box p={2}>
        <Typography variant="h6" color="textSecondary"></Typography>
      </Box>
    );
  }

  const homeTeam = chat.chatDetails?.homeTeam;
  const awayTeam = chat.chatDetails?.awayTeam;
  const homeScore = chat.chatDetails?.homeScore;
  const awayScore = chat.chatDetails?.awayScore;

const userCount = users.length;
  

  return (
    <Box>
      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        <Grid sx={{ width: "50%", mx: 2, mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography fontSize="16px" fontWeight="700" color={homeTeamColor}>
              {homeScore}
            </Typography>
            <Avatar
              src={homeTeam?.lmLogo}
              alt={homeTeam?.name}
              sx={{ width: 24, height: 24 }}
            />
            <Typography
              color={homeTeamColor}
              fontSize="16px"
              fontWeight="700"
              variant="body1"
            >
              {homeTeam?.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Typography fontSize="16px" fontWeight="700" color={awayTeamColor}>
              {awayScore}
            </Typography>
            <Avatar
              src={awayTeam?.lmLogo}
              alt={awayTeam?.name}
              sx={{ width: 24, height: 24 }}
            />
            <Typography
              color={awayTeamColor}
              fontWeight="700"
              fontSize="16px"
              variant="body1"
            >
              {awayTeam?.name}
            </Typography>
          </Box>
        </Grid>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            mt: 2,
            gap: 1,
            pl: 33,
          }}
        >
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "#2CCEC31A;;",
              borderRadius: "15px",
              border: "3px solid #FFFFFF4D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ color: "#17C9BC", fontSize: "16px", fontWeight: "700" }}
            >
              0
            </Typography>
            <Typography
              sx={{ color: "#17C9BC", fontSize: "8px", fontWeight: "500" }}
            >
              2nd
            </Typography>
          </Box>
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: "#FF2054;",
              borderRadius: "15px",
              border: "3px solid #FFFFFF4D;",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ color: "#fff", fontSize: "16px", fontWeight: "700" }}
            >
              FT
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid sx={{ width: "100%", height: "45%" }}>
        <Box
          sx={{
            width: "95%",
            height: "25px",
            display: "flex",
            flexDirection: "row",
            mt: 1.5,
            mx: 2,

            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Button
              sx={{
                backgroundColor: "rgba(0, 195, 181, 0.15)",
                color: "rgba(13, 223, 209, 0.98)",
                fontSize: "12px",
                borderRadius: "10px",
                textTransform: "none",
              }}
            >
              Stats
            </Button>
            <Button
              sx={{
                backgroundColor: "rgba(0, 195, 181, 0.15)",
                color: "rgba(13, 223, 209, 0.98)",
                fontSize: "12px",
                borderRadius: "10px",
                textTransform: "none",
              }}
            >
              Table
            </Button>
            <Button
              sx={{
                backgroundColor: "rgba(0, 195, 181, 0.15)",
                color: "rgba(13, 223, 209, 0.98)",
                fontSize: "12px",
                borderRadius: "10px",
                textTransform: "none",
              }}
            >
              Fixtures
            </Button>
          </Box>
          <Box
            component="div"
            sx={{
              cursor: "auto",
              color: "#FF1F5590",
              backgroundColor: "#ff1f550d",
              borderRadius: "10px",
              width: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height:"24px"
              
            }}
          >
            <Typography sx={{fontSize:"10px",fontWeight:600}}>
              {userCount} Chatters
              
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
