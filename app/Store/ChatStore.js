import { create } from 'zustand';

export const useChatStore = create((set) => ({
  chats: [],
  setChats: (data) => set({ chats: data }),
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
}));
