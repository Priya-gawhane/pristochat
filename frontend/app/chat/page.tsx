"use client";
import axios from "axios";

import { useState } from "react";
import API from "@/lib/api";
import Sidebar from "@/components/sidebar";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);

  const sendMessage = async (text: string) => {
    const token = localStorage.getItem("token");

    // const res = await API.post(
    //   "/chat",
    //   { message: text },
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );

    const res = await axios.post (
      "http://127.0.0.1:8000/chat/",
      { message: text },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    setMessages([
      ...messages,
      { role: "user", content: text },
      { role: "assistant", content: res.data.response },
    ]);
  };

  return (
    <div className="flex h-screen bg-[#212121] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <ChatWindow messages={messages} />
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}