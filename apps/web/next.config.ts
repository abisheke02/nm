import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@nithya/ui"],
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
