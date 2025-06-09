import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "";

class SocketService {
  constructor() {
    this.socket = null;
    this.identifiersQueue = [];
    this.currentIdentifierIndex = 0;
    this.handlers = null;
  }

  async connect() {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Attempting socket connection...", {
        SOCKET_URL,
        hasToken: !!token,
      });

      if (!token) {
        console.error("No access token found in localStorage.");
        return;
      }

      if (!SOCKET_URL) {
        console.error("SOCKET_URL is not defined.");
        return;
      }

      if (!this.socket) {
        this.socket = io(SOCKET_URL, {
          auth: { token },
          path: "/socketio/socket.io",
          reconnection: true,
          reconnectionAttempts: 100,
          reconnectionDelay: 2000,
          timeout: 10000,
        });

        this.socket.on("connect", () => {
          console.log("Socket connected:", {
            socketId: this.socket.id,
            connected: this.socket.connected,
            timestamp: new Date().toISOString(),
          });
          if (this.handlers && this.identifiersQueue.length > 0) {
            this.tryJoinNextIdentifier(this.handlers);
          }
        });

        this.socket.on("disconnect", (reason) => {
          console.warn("🔌 Socket disconnected:", { reason, timestamp: new Date().toISOString() });
        });

        this.socket.on("connect_error", (err) => {
          console.error("Socket connect_error:", {
            message: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString(),
          });
        });

        this.socket.on("error", (err) => {
          console.error("General socket error:", {
            message: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString(),
          });
        });
      }
    } catch (error) {
      console.error("Failed to connect to the socket:", {
        error: error.message,
        timestamp: new Date().toISOString(),
      });
      this.disconnect();
    }
  }

  initializeListeners(initialIdentifier, identifiersData, handlers) {
    console.log("Initializing listeners with:", {
      initialIdentifier,
      identifiersCount: identifiersData.length,
    });
    this.handlers = handlers;

    const isSameIdentifier =
      this.identifiersQueue.length > 0 &&
      this.identifiersQueue[0].identifier === initialIdentifier.identifier;

    if (!isSameIdentifier) {
      this.identifiersQueue = identifiersData.reduce((acc, item) => {
        if (item.identifier === initialIdentifier.identifier) {
          acc.unshift(item);
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      this.currentIdentifierIndex = 0;
      this.tryJoinNextIdentifier(handlers);
    }
  }

  tryJoinNextIdentifier(handlers) {
    if (this.currentIdentifierIndex >= this.identifiersQueue.length || !this.socket) {
      
      return;
    }

    const { type, identifier } = this.identifiersQueue[this.currentIdentifierIndex];

    console.log("Emitting join-chat-space:", { type, identifier });
    console.log("Current type being used:", type);
    console.log("isConnected:", this.isConnected());

    this.socket.emit("join-chat-space", { type, identifier });

    this.socket.on("unauthorized_usage", () => {
      handlers.setIsUserAccBanned?.(true);
      handlers.handleLogout?.();
    });

    this.socket.on("user-joining-failure", () => {
      console.warn("User joining failed.");
      this.handleJoinFailure(handlers);
      handlers.setIdentifier?.(null);
      handlers.setJoinedRoomId?.(null);
      handlers.setType?.(null);
    });

    this.socket.on("user-joined", (data) => {
      
      this.handleUserJoined(type, identifier, data, handlers);
      handlers.setJoinedRoomId?.(data.roomId);
    });
  }

  handleUserJoined(type, identifier, data, handlers) {
    // Catch-all listener for debugging all incoming events
    this.socket.onAny((event, ...args) => {
      
    });

    handlers.setIdentifier?.(identifier);
    handlers.setType?.(type);
    handlers.setUserFailed?.(false);
    handlers.setJoinedRoomId?.(data.roomId);

    this.socket.on("room:user-join", handlers["room:user-join"] ?? (() => {}));
    this.socket.on("room:update-user", handlers["room:user-join"] ?? (() => {}));
    this.socket.on("match-update", handlers["match-update"] ?? (() => {}));
    this.socket.on("room:user-kicked-out", () => {
      handlers.setIsUserKickOut?.(true);
    });
    this.socket.on("room:user-left", (data) => {
      handlers["room:user-left"]?.(data.userId);
    });

    this.socket.on("room:new-message", (data) => {
       console.log("Received room:new-message event:", data);
      handlers.addNewMessage?.(data);
      
      if (data.type === "quiz") {
        handlers.addQuizMessage?.(data);
      }
    });
    this.socket.on("new-message", (data) => {
      
      handlers.addNewMessage?.(data);
      if (data.type === "quiz") {
        handlers.addQuizMessage?.(data);
      }
    });
    this.socket.on("update-message", (data) => {
      console.log("[update-message]", data);
      handlers.updateMessage?.(data);
      handlers.updateQuizMessage?.(data);
    });

    this.socket.emit("room:users-typing-status");
    this.socket.on("room:users-typing-status", handlers["room:users-typing-status"] ?? (() => {}));
    this.socket.on("room:start-typing", handlers["room:start-typing"] ?? (() => {}));
    this.socket.on("room:stop-typing", handlers["room:stop-typing"] ?? (() => {}));

    this.socket.on("refresh-users", () => handlers.setChatUserRefresh?.((prev) => !prev));
    this.socket.on("refresh-messages", () => handlers.setRefreshMsg?.((prev) => !prev));
    this.socket.on("refresh-chat", () => handlers.setChatRefresh?.((prev) => !prev));
    this.socket.on("chatspace-update", handlers["chatspace-update"] ?? (() => {}));

    this.socket.on("room:user-reported", handlers["room:user-reported"] ?? (() => {}));
    this.socket.on("room:user-report-failed", handlers["room:user-report-failed"] ?? (() => {}));
    this.socket.on("room:message-reported", handlers["room:message-reported"] ?? (() => {}));
    this.socket.on("room:message-report-failed", handlers["room:message-report-failed"] ?? (() => {}));
  }

  reportUser(userId) {
    if (this.isConnected()) {
      this.socket.emit("room:report-user", { userId });
    } else {
      console.warn("Cannot report user: socket not connected");
    }
  }

  reportMessage(messageId) {
    if (this.isConnected()) {
      this.socket.emit("room:report-message", { messageId });
    } else {
      console.warn("Cannot report message: socket not connected");
    }
  }

  handleJoinFailure(handlers) {
    if (this.currentIdentifierIndex < this.identifiersQueue.length - 1) {
      this.currentIdentifierIndex += 1;
      this.tryJoinNextIdentifier(handlers);
    } else {
      handlers.setUserFailed?.(true);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log("Socket disconnected manually.");
      this.socket = null;
    }
  }

  isConnected() {
    return !!this.socket?.connected;
  }

  sendMessage(eventName, data, callback) {
    if (this.isConnected()) {
      console.log("Emitting message:", eventName, JSON.stringify(data, null, 2));
      this.socket.emit(eventName, data, callback);
    } else {
      console.error("Cannot send message: socket not connected");
      if (callback) callback({ error: "Socket not connected" });
    }
  }

  listenToEvent(eventName, callback) {
    if (this.isConnected()) {
      this.socket.on(eventName, callback);
    } else {
      console.warn("Cannot listen to event: socket not connected");
    }
  }

  emitTypingEvents(eventName) {
    if (this.isConnected()) {
      this.socket.emit(eventName);
    } else {
      console.warn("Cannot emit typing event: socket not connected");
    }
  }

  offEvent(event, callback) {
    this.socket?.off(event, callback);
  }
}

const socketService = new SocketService();
export default socketService;