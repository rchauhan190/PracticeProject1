'use client'
import { create } from 'zustand'

export const useMessageStore = create((set) => ({
  messages: [],
  loading: false,
  error: null,

  setMessages: (messages) => set({ messages }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetMessages: () => set({ messages: [], error: null, loading: false }),
}))
