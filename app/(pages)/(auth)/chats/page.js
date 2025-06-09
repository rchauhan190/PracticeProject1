"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useChatStore } from "../../../Store/ChatStore";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";
import send_icon from "../../../../public/send_icon.svg";
import games from "../../../../public/games.png";
import profile_icon from "../../../../public/profile_icon.png";
import ChatSignIn from "../chats/ChatSIgnIn/page";
import EventCard from "../chats/EventCard/page";
import Messages from "./Messages/page";
import socketService from "../../../../Services/SocketService";
import debounce from "lodash.debounce";

export default function Chats() {
  const [chatSpaceData, setChatSpaceData] = useState([]);
  const setChats = useChatStore((state) => state.setChats);
  const setSelectedChat = useChatStore((state) => state.setSelectedChat);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [selectedChatIdentifier, setSelectedChatIdentifier] = useState(null);
  const [userId, setUserId] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [incomingMessages, setIncomingMessages] = useState([]);
  const typingTimeoutRef = useRef(null);

  // Debounced typing function
  const debouncedTyping = useMemo(
    () =>
      debounce(() => {
        if (socketService.isConnected()) {
          socketService.emitTypingEvents("room:start-typing");
        } else {
          console.warn("Cannot emit typing event: socket not connected");
        }
      }, 500),
    []
  );

  // Typing handler
  const handleTyping = useCallback(() => {
    if (!socketService.isConnected()) {
      console.warn("Cannot handle typing: socket not connected");
      return;
    }

    if (!isTyping) {
      setIsTyping(true);
      debouncedTyping();
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socketService.emitTypingEvents("room:stop-typing");
    }, 3000);
  }, [isTyping, debouncedTyping]);

  
  useEffect(() => {
    return () => {
      debouncedTyping.cancel();
      clearTimeout(typingTimeoutRef.current);
    };
  }, [debouncedTyping]);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.warn("No access token found for profile");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/v1/user/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const userId = response.data?.data?.userId || response.data?.userId;
        setUserId(userId);
        setProfileDetails(response?.data?.data);
        console.log("Profile fetched:", response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Fetch chatspaces
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/v1/chatspace`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          if (Array.isArray(response.data.data)) {
            setChats(response.data.data);
            setChatSpaceData(response.data.data);
          } else {
            console.warn("Chatspaces response is not an array:", response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch chatspaces:", error);
          setLoading(false);
        });
    } else {
      console.warn("No access token for chatspaces");
      setLoading(false);
    }
  }, [setChats]);

  // Set initial chatspace
  useEffect(() => {
    if (chatSpaceData.length > 0 && !selectedChatIdentifier) {
      console.log("Setting initial chatspace:", chatSpaceData[0].identifier);
      setSelectedChatIdentifier(chatSpaceData[0].identifier);
    }
  }, [chatSpaceData, selectedChatIdentifier]);

  // Socket connection
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      socketService.connect();
      socketService.socket?.on("connect", () => {
        console.log("Socket connected:", socketService.isConnected());
      });
      socketService.socket?.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
        setTimeout(() => socketService.connect(), 5000);
      });
    }
    return () => {
      socketService.disconnect();
    };
  }, []);

  // Memoized selectedChat
  const selectedChat = useMemo(
    () =>
      chatSpaceData.find(
        (chat) => chat.identifier === selectedChatIdentifier
      ) || chatSpaceData[0],
    [chatSpaceData, selectedChatIdentifier]
  );

  const chatspaceId = selectedChat?._id;
  const homeTeamColor = selectedChat?.chatDetails?.homeTeam?.lmColor;
  const awayTeamColor = selectedChat?.chatDetails?.awayTeam?.lmColor;

  // Reset incomingMessages on chatspace switch
  useEffect(() => {
    console.log("Chatspace changed, resetting incomingMessages:", chatspaceId);
    setIncomingMessages([]);
  }, [chatspaceId]);

  // Join chatspace + initialize socket listeners
  useEffect(() => {
    if (
      !selectedChat?.identifier ||
      !selectedChat?.type ||
      !socketService.isConnected()
    ) {
      console.log("Cannot join chatspace:", {
        identifier: selectedChat?.identifier,
        type: selectedChat?.type,
        socketConnected: socketService.isConnected(),
      });
      return;
    }

    const chatMeta = {
      type: selectedChat.type,
      identifier: selectedChat.identifier,
    };

    console.log("Emitting join-chat-space:", chatMeta);
    socketService.socket?.emit("join-chat-space", chatMeta);

    const handlers = {
      setJoinedRoomId: (roomId) => {
        setRoomId(roomId);
        console.log("✅ Set roomId:", roomId);
      },
      addNewMessage: (data) => {
        console.log("New message received in Chats:", data);
        setIncomingMessages((prev) => {
          const exists = prev.some(
            (msg) =>
              msg.message_id === data.message_id ||
              (msg.tempId && msg.tempId === data.tempId) ||
              (msg.timestamp === data.timestamp &&
                msg.sender_id === data.sender_id &&
                msg.content === data.content)
          );
          console.log("Incoming message exists:", exists, "Adding:", !exists);
          if (!exists) {
            return [...prev, data];
          }
          return prev;
        });
      },
      "room:user-join": (data) => {
        console.log("User joined room:", data);
      },
      "room:user-left": (data) => {
        console.log("User left room:", data);
      },
      "chatspace-update": (updatedChatspaces) => {
        console.log("Chatspaces updated:", updatedChatspaces);
        setChatSpaceData(updatedChatspaces);
      },
      "room:start-typing": (data) => {
        console.log("Typing started:", data);
      },
      "room:stop-typing": (data) => {
        console.log("Typing stopped:", data);
      },
    };

    socketService.initializeListeners(selectedChat, [selectedChat], handlers);

    return () => {
      socketService.offEvent("chatspace-update");
      socketService.offEvent("room:new-message");
      socketService.offEvent("room:start-typing");
      socketService.offEvent("room:stop-typing");
      socketService.offEvent("room:user-join");
      socketService.offEvent("room:user-left");
    };
  }, [selectedChat, selectedChatIdentifier, chatSpaceData]);

  const handleSend = useCallback(() => {
    console.log("handleSend called, value:", value);
    if (!value.trim()) {
      console.log("Empty message, not sending");
      return;
    }

    if (!socketService.isConnected()) {
      console.warn("Socket is not connected, cannot send message");
      return;
    }

    if (!chatspaceId || !userId) {
      console.error("Missing required fields:", { chatspaceId, userId });
      return;
    }

    const messageData = {
      content: value.trim(),
      type: "text",
      chatspace_id: chatspaceId,
      sender_id: userId,
      timestamp: new Date().toISOString(),
      username: profileDetails?.username || "Unknown",
      tempId: `temp_${Date.now()}`,
    };

    try {
      
      console.log("Adding optimistic message:", messageData);
      setIncomingMessages((prev) => [...prev, messageData]);
      console.log("Emitting room:new-message:", messageData);
      socketService.sendMessage("room:new-message", messageData, (response) => {
        console.log("Server acknowledgment:", response);
        if (response?.error) {
          console.error("Server rejected message:", response.error);
          setIncomingMessages((prev) =>
            prev.filter((msg) => msg.tempId !== messageData.tempId)
          );
        } else {
          console.log("Message sent successfully");
          setValue("");
          setIsTyping(false);
          socketService.emitTypingEvents("room:stop-typing");
        }
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      setIncomingMessages((prev) =>
        prev.filter((msg) => msg.tempId !== messageData.tempId)
      );
    }
  }, [value, chatspaceId, userId, profileDetails]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "768px",
          minWidth: "200px",
          height: "100vh",
          boxShadow: "0px 4px 10px rgba(35, 35, 35, 0.1)",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              width: "98%",
              height: "83vh",
              my: 11,
              mx: "auto",
              borderRadius: "15px",
              boxShadow: "2px 0 0 0 #00E3D3",
            }}
          >
            <Box
              sx={{
                height: "150px",
                width: "99%",
                position: "relative",
                top: "-88px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "40px",
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  overflowX: "auto",
                  overflowY: "hidden",
                  whiteSpace: "nowrap",
                  paddingBottom: "1px",
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {chatSpaceData.map((chat) => {
                  const homeTeam = chat.chatDetails?.homeTeam;
                  const homeScore = chat.chatDetails?.homeScore;
                  const awayTeam = chat.chatDetails?.awayTeam;
                  const awayScore = chat.chatDetails?.awayScore;
                  const chatspaceId = chat._id;

                  return (
                    <Box
                      key={chat._id}
                      role="button"
                      tabIndex={0}
                      sx={{
                        backgroundColor:
                          chat.identifier === selectedChatIdentifier
                            ? "rgba(226, 246, 245, 0.6)"
                            : null,
                        borderRadius: 3,
                        p: 1,
                        mt: 2,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        minWidth: "80px",
                        flex: "1 0 20%",
                        maxWidth: "100px",
                      }}
                      onClick={() => {
                        if (chatspaceId && userId) {
                          console.log("Selecting chatspace:", chat.identifier);
                          setSelectedChatIdentifier(chat.identifier);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          setSelectedChatIdentifier(chat.identifier);
                        }
                      }}
                    >
                      <Grid
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Image
                          src={homeTeam?.lmLogo}
                          alt={`${homeTeam?.name || "Home"} logo`}
                          width={15}
                          height={15}
                          style={{ borderRadius: "50%" }}
                        />
                        <Typography fontSize="12px" fontWeight="bold">
                          {homeScore}
                        </Typography>
                        <Typography>-</Typography>
                        <Typography fontSize="12px" fontWeight="bold">
                          {awayScore}
                        </Typography>
                        <Image
                          src={awayTeam?.lmLogo}
                          alt={`${awayTeam?.name || "Away"} logo`}
                          width={15}
                          height={15}
                          style={{ borderRadius: "50%" }}
                        />
                      </Grid>
                    </Box>
                  );
                })}
              </Box>
              <Box
                sx={{
                  height: "110px",
                  width: "100%",
                  position: "relative",
                  top: "3px",
                  left: "4px",
                  borderRadius: "20px",
                  boxShadow: "0px 2px 12px #4DB6AC4D",
                }}
              >
                <EventCard
                  chat={selectedChat}
                  homeTeamColor={homeTeamColor}
                  awayTeamColor={awayTeamColor}
                />
              </Box>
            </Box>
            <Box sx={{ width: "97%", height: "91%", mt: -10, ml: 2 }}>
              <Messages
                chatspaceId={chatspaceId}
                userId={userId}
                roomId={roomId}
                incomingMessages={incomingMessages}
              />
            </Box>
          </Box>
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "74px",
              width: "100%",
              px: 2,
              mt: -12.5,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                width: "50px",
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Image
                src={profile_icon}
                alt="Open profile settings"
                width={34}
                height={38}
                onClick={() => setDrawerOpen(true)}
                style={{ cursor: "pointer" }}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                ml: 2,
                mt: 2,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "rgb(221, 245, 240)",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "14px",
                  px: 2,
                  py: 1,
                  minWidth: "60%",
                  height: "55px",
                }}
              >
                <TextField
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    handleTyping();
                  }}
                  variant="standard"
                  placeholder="Start Typing"
                  InputProps={{
                    disableUnderline: true,
                    sx: {
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: value
                        ? "rgba(85, 206, 198, 1)"
                        : "rgba(85, 206, 198, 0.6)",
                      "::placeholder": { color: "rgba(85, 206, 198, 0.6)" },
                    },
                  }}
                  fullWidth
                />
                <Box sx={{ ml: 1, mt: 1 }}>
                  <Image src={games} alt="Games icon" width={30} height={20} />
                </Box>
              </Box>
              <Button
                sx={{
                  width: 55,
                  height: 55,
                  backgroundColor: "#00c3b5",
                  borderRadius: "14px",
                  minWidth: 0,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSend}
              >
                <Box sx={{ transform: "rotate(-45deg)", ml: 1 }}>
                  <Image
                    src={send_icon}
                    alt="Send message"
                    width={20}
                    height={20}
                  />
                </Box>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ChatSignIn open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Box>
  );
}