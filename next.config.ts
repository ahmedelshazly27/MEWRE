import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Changes on every build so the service worker refreshes the offline copy after a deploy.
    NEXT_PUBLIC_BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) || String(Date.now()),
  },
  async headers() {
    return [{ source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache" }, { key: "Service-Worker-Allowed", value: "/" }] }];
  },
};

export default nextConfig;
