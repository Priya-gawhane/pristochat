import { NextRequest, NextResponse } from "next/server";
import { backendUrl, withCookies } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(backendUrl("/chat/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...withCookies(req),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => ({ detail: "Chat error" }));
    return NextResponse.json(data, { status: res.status });
  }

  // Stream the response body directly, forwarding the conversation ID header
  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Conversation-Id": res.headers.get("X-Conversation-Id") ?? "",
    },
  });
}
