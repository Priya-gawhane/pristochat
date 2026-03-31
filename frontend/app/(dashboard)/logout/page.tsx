"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await API.post("/auth/logout");
      } catch (error) {
        console.error("Logout failed", error);
      } finally {
        router.push("/auth/login");
      }
    };

    performLogout();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#131315] text-white font-body">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined text-4xl animate-pulse text-secondary">logout</span>
        <p className="font-headline tracking-widest uppercase text-sm text-outline-variant">Terminating session...</p>
      </div>
    </div>
  );
}
