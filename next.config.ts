import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [],
    unoptimized: true,
  },
};

export default nextConfig;
