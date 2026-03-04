export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#171717] p-4 border-r border-gray-700 hidden md:block">
      <button className="w-full bg-white text-black py-2 rounded mb-4">
        + New Chat
      </button>
      <p className="text-sm text-gray-400">Chat history coming soon...</p>
    </aside>
  );
}