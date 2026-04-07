import { NextRequest, NextResponse } from "next/server";
import { backendUrl, withCookies } from "@/lib/backend";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ conv_id: string }> }
) {
  const { conv_id } = await params;

  const res = await fetch(backendUrl(`/chat/conversations/${conv_id}/messages`), {
    headers: withCookies(req),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
