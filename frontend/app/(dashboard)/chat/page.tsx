"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import API from "@/lib/api";
import { useConversations } from "@/contexts/ConversationsContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { refresh: refreshConversations } = useConversations();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState<string | null>(
    searchParams.get("conv")
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Load messages when a conversation is selected via ?conv=
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
      // New chat — clear messages
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

      // Capture conversation ID from header (new conversation case)
      const returnedConvId = res.headers.get("X-Conversation-Id");
      if (returnedConvId && !convId) {
        setConvId(returnedConvId);
        router.replace(`/chat?conv=${returnedConvId}`, { scroll: false });
        // Directly call refresh on the shared context — instant, no events needed
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
    <div className="flex h-screen bg-surface text-on-surface font-body selection:bg-primary-container selection:text-white overflow-hidden pt-16">
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full bg-[#131315] relative overflow-hidden">
        {/* Decorative glow blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary-container/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Message thread */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 md:px-8 py-12 flex flex-col gap-10 max-w-5xl mx-auto w-full z-10 scroll-smooth"
        >
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
              <span className="material-symbols-outlined text-6xl mb-4">forum</span>
              <h3 className="font-headline text-2xl tracking-tight text-white mb-2">
                Welcome to PristoChat
              </h3>
              <p className="font-body text-sm text-on-surface-variant max-w-sm">
                Start a conversation using the premium Digital Obsidian interface.
              </p>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.role === "user" ? "items-end group" : "items-start gap-4 group"}`}
              >
                {m.role === "assistant" && (
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-bright border border-secondary/20 shadow-[0_0_15px_rgba(208,188,255,0.1)]">
                      <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(208,188,255,0.8)]" />
                      <span className="text-[10px] font-headline font-bold text-secondary uppercase tracking-[0.15em]">
                        {loading && i === messages.length - 1 ? "AI THINKING" : "ZARA"}
                      </span>
                    </div>
                  </div>
                )}

                <div
                  className={`${
                    m.role === "user"
                      ? "max-w-[85%] md:max-w-[70%] bg-surface-container-high p-4 md:p-6 rounded-3xl rounded-tr-none text-on-surface shadow-[0_4px_20px_rgba(0,0,0,0.2)] ghost-border leading-relaxed"
                      : "w-full md:max-w-[85%] bg-surface-container-low p-4 md:p-7 rounded-3xl rounded-tl-none text-on-surface-variant shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border-t border-outline-variant/10 leading-loose text-base md:text-lg overflow-hidden prose prose-invert prose-p:leading-loose"
                  }`}
                >
                  {m.role === "user" ? (
                    m.content
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: (props: any) => (
                          <div className="overflow-x-auto my-4">
                            <table className="w-full border-collapse border border-outline-variant/30 text-sm" {...props} />
                          </div>
                        ),
                        thead: (props: any) => <thead className="bg-surface-container/50" {...props} />,
                        tr: (props: any) => <tr className="border-b border-outline-variant/30" {...props} />,
                        th: (props: any) => <th className="border border-outline-variant/30 px-4 py-2 font-semibold text-left" {...props} />,
                        td: (props: any) => <td className="border border-outline-variant/30 px-4 py-2" {...props} />,
                        code({ className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || "");
                          const isBlock = match !== null;
                          return isBlock ? (
                            <div className="overflow-hidden rounded-xl shadow-lg my-6 bg-[#0E0E10] border border-outline-variant/20">
                              <SyntaxHighlighter
                                style={vscDarkPlus as any}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{ margin: 0, padding: "1.25rem", background: "transparent" }}
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code className="bg-surface-container-highest px-1.5 py-0.5 mx-1 rounded text-primary-fixed-dim font-mono text-sm" {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {m.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 md:p-8 w-full max-w-5xl mx-auto z-40 bg-linear-to-t from-[#131315] to-transparent">
          <div className="glass-panel rounded-[2rem] p-2 pl-6 flex items-end gap-2 ghost-border shadow-[0_10px_40px_rgba(0,0,0,0.4)] ring-1 ring-white/5 focus-within:ring-primary/30 transition-all group">
            <Textarea
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-on-surface placeholder:text-outline-variant font-body py-4 resize-none min-h-[56px] max-h-[200px]"
              placeholder="Message PristoChat..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center gap-1 pr-2 pb-1.5">
              <button
                className="w-12 h-12 rounded-full bg-linear-to-br from-primary-container to-secondary-container flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] group-focus-within:shadow-primary-container/60 transition-all active:scale-90 disabled:opacity-50 disabled:grayscale focus:outline-none"
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
              >
                {loading ? (
                  <Spinner className="text-white fill-white size-5" />
                ) : (
                  <span className="material-symbols-outlined ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                    send
                  </span>
                )}
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center mt-3 text-outline-variant font-label uppercase tracking-widest opacity-60">
            PristoChat can make mistakes. Check important info.
          </p>
        </div>
      </main>
    </div>
  );
}