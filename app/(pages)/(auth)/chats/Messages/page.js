"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Box,
  Alert,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import TweetMessage from "./TweetMessage/page";
import QuizMessage from "./QuizMessage/page";
import useUserStore from "../../../../Store/UsersStore";

export default function Messages({ chatspaceId, userId, roomId, incomingMessages }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { users, setUsers } = useUserStore();
  const bottomRef = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("accessToken");
      if (!chatspaceId || !roomId || !token) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/v1/user/list?chatspaceId=${chatspaceId}&roomId=${roomId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUsers(res.data.data || []);
      } catch (err) {
        console.error("User fetch error:", err);
        setError("Failed to load users.");
      }
    };

    fetchUsers();
  }, [chatspaceId, roomId]);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("accessToken");
      if (!chatspaceId || !roomId || !token) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/v1/message?chatspaceId=${chatspaceId}&type=first_load&roomId=${roomId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(res.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Message fetch error:", err);
        setError("Failed to load messages.");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatspaceId, roomId]);

  // Handle incoming messages via socket
  useEffect(() => {
    if (!incomingMessages || incomingMessages.length === 0) return;

    setMessages((prev) => {
      const seenIds = new Set(prev.map((msg) => msg.message_id || msg.tempId));
      const newOnes = incomingMessages.filter((msg) => {
        const id = msg.message_id || msg.tempId;
        return !seenIds.has(id);
      });

      if (newOnes.length === 0) return prev;
      return [...prev, ...newOnes];
    });
  }, [incomingMessages]);

  const USER_COLORS = ["#42B0DF", "#1FD110", "#8710D1", "#F39C12"];
  const SPRING_TEAM_COLOR = "#00C3B5";

  function getUserColor(username) {
    if (username === "Team Spring Chat") return SPRING_TEAM_COLOR;
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % USER_COLORS.length;
    return USER_COLORS[index];
  }

  function getLightBackground(hex, alpha = 0.08) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt || a.timestamp) - new Date(b.createdAt || b.timestamp)
  );

  const messagesWithUserData = sortedMessages.map((msg) => {
    const user = users.find((u) => u.userId === msg.sender_id || u.userId === msg.senderId);
    return {
      ...msg,
      username: user?.username || "Team Spring Chat",
      senderImage: user?.profileImage || msg.senderImage,
      senderId: msg.sender_id || msg.senderId,
    };
  });

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Box
      sx={{
        padding: 2,
        mb: 1,
        maxHeight: 724,
        overflowY: "auto",
        borderRadius: 2,
        backgroundColor: "#fff",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { width: 0 },
      }}
    >
      {messagesWithUserData.map((message, index) => {
        const isTweet = message.type === "tweet";
        const isQuiz = message.type === "quiz";
        const isSubstitute = message.type === "match_event";
        const isSpringTeam = message.username === "Team Spring Chat";

        const isSentByUser =
          String(message.senderId) === String(userId) &&
          !isTweet &&
          !isQuiz &&
          !isSubstitute;

        const userColor = getUserColor(message.username);
        const bgColor = isSpringTeam
          ? "#F2FCFB"
          : isSentByUser
          ? "#F2FCFB"
          : getLightBackground(userColor, 0.08);

        return (
          <Box key={index} sx={{ width: "100%", mb: 1 }}>
            {isTweet ? (
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 4,
                  backgroundColor: bgColor,
                  color: "#000",
                  whiteSpace: "pre-wrap",
                  maxWidth: 340,
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold" color={userColor} mb={0.5}>
                  {message.username}
                </Typography>
                <TweetMessage tweet={message.tweet} />
              </Box>
            ) : isQuiz ? (
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 4,
                  backgroundColor: bgColor,
                  maxWidth: isMobile ? "100%" : 605,
                  mx: isMobile ? 0 : "auto",
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold" color={userColor} mb={0.5}>
                  {message.username}
                </Typography>
                <QuizMessage quiz={message.quiz} />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: isSentByUser ? "flex-end" : "flex-start",
                  gap: 1,
                  width: "100%",
                }}
              >
                {!isSentByUser && (
                  <Avatar
                    src={message.senderImage}
                    alt={message.username}
                    sx={{ width: 40, height: 40, mt: 2 }}
                  />
                )}
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: isSentByUser
                      ? "12px 12px 0 12px"
                      : "12px 12px 12px 0",
                    backgroundColor: bgColor,
                    maxWidth: "min(340px, 100%)",
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold" color={userColor} mb={0.5}>
                    {message.username}
                  </Typography>
                  <Typography variant="body2">{message.content}</Typography>
                </Box>
                {isSentByUser && (
                  <Avatar
                    src={message.senderImage}
                    alt={message.username}
                    sx={{ width: 40, height: 40, mt: 2 }}
                  />
                )}
              </Box>
            )}
          </Box>
        );
      })}
      <div ref={bottomRef} />
    </Box>
  );
}
