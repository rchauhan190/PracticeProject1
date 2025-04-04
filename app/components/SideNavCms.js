"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ThemeContext } from "../context/ThemeContext";

export default function SideNavCms() {
  const { mode } = useContext(ThemeContext);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSportsDataExpanded, setIsSportsDataExpanded] = useState(false);
  const [isChatspacesExpanded, setIsChatspacesExpanded] = useState(false);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [isAdminExpanded, setIsAdminExpanded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedStates =
      JSON.parse(localStorage.getItem("sidebarStates")) || {};
    setIsSportsDataExpanded(storedStates.sportsData || false);
    setIsChatspacesExpanded(storedStates.chatspaces || false);
    setIsContentExpanded(storedStates.content || false);
    setIsAdminExpanded(storedStates.admin || false);
  }, []);

  const toggleDropdown = (key, setter, currentValue) => {
    const newValue = !currentValue;
    setter(newValue);

    localStorage.setItem(
      "sidebarStates",
      JSON.stringify({
        sportsData: key === "sportsData" ? newValue : isSportsDataExpanded,
        chatspaces: key === "chatspaces" ? newValue : isChatspacesExpanded,
        content: key === "content" ? newValue : isContentExpanded,
        admin: key === "admin" ? newValue : isAdminExpanded,
      })
    );
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box
      sx={{
        width: isCollapsed ? "70px" : { xs: "100%", sm: "250px", md: "430px" },
        height: "100vh",
        bgcolor: mode === "dark" ? "#1A1A1A" : "#fff",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 1, mt: 1 }}>
        <Typography component="a" href="/signin" sx={menuItemStyle(mode)}>
          Dashboard
        </Typography>

        <Box
          sx={{
            ...menuItemStyle(mode),
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() =>
            toggleDropdown(
              "chatspaces",
              setIsChatspacesExpanded,
              isChatspacesExpanded
            )
          }
        >
          Chatspaces{" "}
          {isChatspacesExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Box>
        {isChatspacesExpanded && (
          <Box sx={{ pl: 4 }}>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/competitions")}
            >
              Competitions
            </Typography>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/team-data")}
            >
              Teams
            </Typography>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/live-events")}
            >
              Scheduled Chats
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            ...menuItemStyle(mode),
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() =>
            toggleDropdown(
              "sportsData",
              setIsSportsDataExpanded,
              isSportsDataExpanded
            )
          }
        >
          Sports Data{" "}
          {isSportsDataExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Box>
        {isSportsDataExpanded && (
          <Box sx={{ pl: 4 }}>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/sportscompetitiondata")}
            >
              Competitions
            </Typography>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/sportsteamdata")}
            >
              Teams
            </Typography>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/sportsplayers")}
            >
              Players
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            ...menuItemStyle(mode),
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() =>
            toggleDropdown("content", setIsContentExpanded, isContentExpanded)
          }
        >
          Content Management{" "}
          {isContentExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Box>
        {isContentExpanded && (
          <Box sx={{ pl: 4 }}>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/competitions")}
            >
              Content
            </Typography>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/team-data")}
            >
              Reported Messages
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            ...menuItemStyle(mode),
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={() =>
            toggleDropdown("admin", setIsAdminExpanded, isAdminExpanded)
          }
        >
          Administration{" "}
          {isAdminExpanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Box>
        {isAdminExpanded && (
          <Box sx={{ pl: 4 }}>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/consumers")}
            >
              Consumers
            </Typography>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/signin")}
            >
              Managers
            </Typography>
            <Typography
              sx={submenuItemStyle(mode)}
              onClick={() => handleNavigation("/team-data")}
            >
              Users
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

const menuItemStyle = (mode) => ({
  display: "flex",
  alignItems: "center",
  px: "22px",
  fontSize: "18px",
  fontWeight: "bold",
  height: "50px",
  textDecoration: "none",
  color: mode === "light" ? "#333" : "#fff",
  cursor: "pointer",
  "&:hover": { color: mode === "light" ? "black" : "#bbb" },
});

const submenuItemStyle = (mode) => ({
  display: "flex",
  fontSize: "18px",
  px: "30px",
  m: "15px",
  alignItems: "center",
  height: "40px",
  textDecoration: "none",
  color: mode === "light" ? "#000" : "#ddd",
  cursor: "pointer",
  "&:hover": {
    color: mode === "light" ? "black" : "#bbb",
    backgroundColor: mode === "light" ? "#DBE9F4" : "#333",
    borderRadius: "10px",
  },
});
