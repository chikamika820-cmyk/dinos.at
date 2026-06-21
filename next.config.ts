import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // A stray package.json/package-lock.json in the parent (home) directory
  // makes Next.js infer the workspace root one level up, which makes
  // Turbopack watch the entire home directory in dev mode. Pin it here.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
