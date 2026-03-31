export default function MessageBubble({ role, content }: any) {
  return (
    <div
      className={`p-3 rounded-xl max-w-xl ${
        role === "user"
          ? "bg-blue-600 ml-auto"
          : "bg-gray-700 mr-auto"
      }`}
    >
      {content}
    </div>
  );
}