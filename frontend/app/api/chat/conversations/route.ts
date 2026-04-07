import { NextRequest, NextResponse } from "next/server";
import { backendUrl, withCookies } from "@/lib/backend";

export async function GET(req: NextRequest) {
  const res = await fetch(backendUrl("/chat/conversations"), {
    headers: withCookies(req),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
