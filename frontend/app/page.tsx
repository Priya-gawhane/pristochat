import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-6">
      <h1 className="text-4xl font-bold">Welcome to PristoChat</h1>

      <div className="flex gap-4">
        <Link
          href="/auth/login"
          className="bg-white text-black px-6 py-2 rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/auth/register"
          className="border border-white px-6 py-2 rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}