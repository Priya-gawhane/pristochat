import { NextRequest, NextResponse } from "next/server";
import { backendUrl, withCookies } from "@/lib/backend";

export async function GET(req: NextRequest) {
  const res = await fetch(backendUrl("/auth/me"), {
    headers: withCookies(req),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(backendUrl("/auth/me"), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...withCookies(req),
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
