"use client";

import { useState } from "react";
import API from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    await API.post("/auth/register", {
      username,
      password,
    });

    router.push("/auth/login");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-[#2f2f2f] p-8 rounded-xl w-96">
        <h2 className="text-2xl mb-4">Register</h2>

        <input
          className="w-full p-2 mb-3 bg-[#1f1f1f] rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 bg-[#1f1f1f] rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-white text-black py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}