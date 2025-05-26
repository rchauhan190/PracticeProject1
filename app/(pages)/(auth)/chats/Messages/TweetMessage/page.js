import React from "react";
import { Box, Typography, CardMedia, Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function TweetMessage({ tweet }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        maxWidth: "100%", 
      }}
    >
      {tweet.imageUrl && (
        <CardMedia
          component="img"
          image={tweet.imageUrl}
          alt="Tweet image"
          sx={{
            borderRadius: "12px",
            objectFit: "cover",
            width: "100%",
            maxWidth: "308px",
            height: "294px",
            cursor: "pointer",
            mb: 1,
          }}
        />
      )}

      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar
          src={tweet.userProfileImage}
          alt={tweet.username}
          sx={{
            mr: 1,
            width: 38,
            height: 38,
            borderRadius: 3, 
          }}
        />
        <Typography variant="subtitle2" fontWeight="bold">
          {tweet.username}
        </Typography>
        {tweet.userVerified && (
          <Typography sx={{ fontSize: "1rem", ml: 1 }}>
            <VerifiedIcon />
          </Typography>
        )}
      </Box>

      <Typography
        variant="body2"
        sx={{
          mb: 1,
          fontSize: "1rem",
          whiteSpace: "normal",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          lineHeight: 1.5,
        }}
      >
        {tweet.title?.trim()}
      </Typography>
    </Box>
  );
}
