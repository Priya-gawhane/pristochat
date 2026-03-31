import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((m: any, i: number) => (
        <MessageBubble key={i} role={m.role} content={m.content} />
      ))}
    </div>
  );
}