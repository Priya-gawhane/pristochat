"use client";

export const dynamic = "force-dynamic";

import { Suspense, useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import API from "@/lib/api";
import { useConversations } from "@/contexts/ConversationsContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/* ✅ OUTER COMPONENT (WRAPPER) */
export default function ChatPage() {
  return (
    <Suspense fallback={<div className="text-white p-4">Loading chat...</div>}>
      <ChatInner />
    </Suspense>
  );
}

/* ✅ INNER COMPONENT (YOUR ACTUAL CODE) */
function ChatInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { refresh: refreshConversations } = useConversations();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadConversation = useCallback(async (id: string) => {
    try {
      const res = await API.get(`/chat/conversations/${id}/messages`);
      setMessages(res.data ?? []);
      setConvId(id);
    } catch (err) {
      console.error("Failed to load conversation:", err);
    }
  }, []);

  useEffect(() => {
    const id = searchParams.get("conv");

    if (id) {
      loadConversation(id);
    } else {
      setMessages([]);
      setConvId(null);
    }
  }, [searchParams, loadConversation]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const assistantPlaceholder: Message = { role: "assistant", content: "" };

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: text, conversation_id: convId }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!res.body) throw new Error("No readable stream available");

      const returnedConvId = res.headers.get("X-Conversation-Id");

      if (returnedConvId && !convId) {
        setConvId(returnedConvId);
        router.replace(`/chat?conv=${returnedConvId}`, { scroll: false });
        await refreshConversations();
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let streamedResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedResponse += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: streamedResponse,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Stream error:", error);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "⚠️ Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex h-screen bg-surface text-on-surface overflow-hidden pt-16">
      <main className="flex-1 flex flex-col h-full bg-[#131315] relative overflow-hidden">
        
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-12 flex flex-col gap-10 max-w-5xl mx-auto w-full"
        >
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <h3 className="text-2xl text-white mb-2">
                Welcome to PristoChat
              </h3>
              <p className="text-sm">
                Start a conversation...
              </p>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[70%] p-4 rounded-xl bg-gray-800 text-white">
                  {m.role === "user" ? (
                    m.content
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 w-full max-w-5xl mx-auto">
          <div className="flex gap-2">
            <Textarea
              className="flex-1"
              placeholder="Message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="bg-blue-600 px-4 rounded text-white"
            >
              {loading ? <Spinner /> : "Send"}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}