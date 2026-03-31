"use client";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import API from "@/lib/api";
import { useConversations } from "@/contexts/ConversationsContext";

export function AppSidebar() {
  const { state } = useSidebar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeConvId = searchParams.get("conv");

  const { conversations, refresh } = useConversations();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeletingId(id);
    try {
      await API.delete(`/chat/conversations/${id}`);
      await refresh(); // Immediately refresh the shared list
      if (activeConvId === id) router.push("/chat");
    } catch {
      // silently fail
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Sidebar className="border-r border-outline-variant/10 bg-surface">
      <div className="flex flex-col h-full bg-[#131315] p-6 shrink-0 relative z-40">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-container to-secondary-container flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] shrink-0">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
          </div>
          {state === "expanded" && (
            <div className="overflow-hidden whitespace-nowrap">
              <h2 className="font-headline font-bold tracking-tight text-white">PristoChat</h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-label">
                Digital Obsidian v2.0
              </p>
            </div>
          )}
        </div>

        {/* New Chat button */}
        <Link href="/chat">
          <button
            className={`w-full py-3 mb-8 bg-linear-to-r from-primary-container to-secondary-container text-white rounded-xl font-headline font-bold text-sm tracking-wide shadow-lg shadow-primary-container/20 active:translate-x-1 duration-200 transition-all flex items-center justify-center gap-2 ${
              state === "collapsed" ? "px-0" : ""
            }`}
          >
            <span className="material-symbols-outlined text-sm">add</span>
            {state === "expanded" && "New Chat"}
          </button>
        </Link>

        {/* Conversation History  c*/}
        <nav className="flex-1 overflow-y-auto space-y-1">
          {state === "expanded" && (
            <div className="mb-3">
              <span className="text-[10px] font-headline uppercase tracking-[0.2em] text-outline-variant px-3">
                Recent Chats
              </span>
            </div>
          )}

          {state === "expanded" && conversations.length === 0 && (
            <div className="px-3 py-8 text-center">
              <span className="material-symbols-outlined text-3xl text-outline-variant/40 mb-2 block">forum</span>
              <p className="text-xs text-outline-variant">No chats yet</p>
            </div>
          )}

          {state === "expanded" &&
            conversations.map((conv) => {
              const isActive = activeConvId === conv.id;
              const isDeleting = deletingId === conv.id;
              return (
                <Link
                  key={conv.id}
                  href={`/chat?conv=${conv.id}`}
                  className={`group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${
                    isActive
                      ? "bg-primary-container/20 text-white border border-primary-container/30"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="material-symbols-outlined text-[16px] shrink-0 opacity-60">
                      chat_bubble
                    </span>
                    <span className="text-sm truncate leading-tight">{conv.title}</span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, conv.id)}
                    disabled={isDeleting}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-red-500/20 hover:text-red-400 text-outline-variant"
                    title="Delete conversation"
                  >
                    {isDeleting ? (
                      <span className="material-symbols-outlined text-[14px] animate-spin">
                        progress_activity
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    )}
                  </button>
                </Link>
              );
            })}

          {/* Collapsed state: show icon-only list */}
          {state === "collapsed" &&
            conversations.slice(0, 6).map((conv) => (
              <Link
                key={conv.id}
                href={`/chat?conv=${conv.id}`}
                title={conv.title}
                className={`flex items-center justify-center py-2 rounded-xl transition-all ${
                  activeConvId === conv.id
                    ? "bg-primary-container/20 text-white"
                    : "text-outline-variant hover:bg-surface-container-low hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
              </Link>
            ))}
        </nav>

        {/* Bottom actions */}
        <div className="mt-auto pt-6 space-y-2 border-t border-outline-variant/10">
          <Link
            href="/profile"
            className={`text-on-surface-variant hover:bg-[#1c1c1e] hover:text-white transition-all rounded-xl py-3 flex items-center gap-3 active:translate-x-1 duration-200 cursor-pointer ${
              state === "collapsed" ? "justify-center" : "px-4"
            }`}
          >
            <span className="material-symbols-outlined">person</span>
            {state === "expanded" && (
              <span className="font-headline text-sm uppercase tracking-widest">Profile</span>
            )}
          </Link>
          <Link
            href="/logout"
            className={`text-on-surface-variant hover:bg-[#1c1c1e] hover:text-white transition-all rounded-xl py-3 flex items-center gap-3 active:translate-x-1 duration-200 cursor-pointer ${
              state === "collapsed" ? "justify-center" : "px-4"
            }`}
          >
            <span className="material-symbols-outlined">logout</span>
            {state === "expanded" && (
              <span className="font-headline text-sm uppercase tracking-widest">Log Out</span>
            )}
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}
