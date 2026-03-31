import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "contribution.usercontent.google.com",
      }
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy all /api/* calls to the FastAPI backend.
        // This ensures the auth cookie is treated as same-origin by the browser.
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*",
      },
    ];
  },
};

export default nextConfig;
