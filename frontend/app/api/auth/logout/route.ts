import { NextRequest, NextResponse } from "next/server";
import { backendUrl, withCookies } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const res = await fetch(backendUrl("/auth/logout"), {
    method: "POST",
    headers: withCookies(req),
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  // Forward the cookie-clearing Set-Cookie header from FastAPI
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
