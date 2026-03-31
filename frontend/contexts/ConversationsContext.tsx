"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import API from "@/lib/api";

interface Conversation {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
}

interface ConversationsContextValue {
  conversations: Conversation[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const ConversationsContext = createContext<ConversationsContextValue>({
  conversations: [],
  loading: false,
  refresh: async () => {},
});

export function ConversationsProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/chat/conversations");
      setConversations(res.data ?? []);
    } catch {
      // Not authenticated yet or network error
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ConversationsContext.Provider value={{ conversations, loading, refresh }}>
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  return useContext(ConversationsContext);
}
