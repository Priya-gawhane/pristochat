const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

export function backendUrl(path: string) {
  return `${BACKEND_URL}${path}`;
}

/** Forward the browser's cookie header to the FastAPI backend. */
export function withCookies(req: Request): HeadersInit {
  const cookie = req.headers.get("cookie");
  return cookie ? { Cookie: cookie } : {};
}
