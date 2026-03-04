import { useState } from "react";

export default function ChatInput({ onSend }: any) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 border-t border-gray-700 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 bg-gray-800 rounded"
        placeholder="Type message..."
      />
      <button
        onClick={send}
        className="bg-white text-black px-4 rounded"
      >
        Send
      </button>
    </div>
  );
}