import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Suppress Turbopack lockfile warning
    turbo: {
      resolveAlias: {},
    },
  },
};

export default nextConfig;
