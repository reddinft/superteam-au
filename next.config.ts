import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Turbopack root — set explicitly to silence workspace lockfile warning
    root: __dirname,
  },
};

export default nextConfig;
