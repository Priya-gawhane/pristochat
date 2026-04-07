import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(backendUrl("/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const response = NextResponse.json(data, { status: res.status });

  // Forward the HttpOnly access_token cookie set by FastAPI
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
