import type { NextConfig } from "next";

const backendHost = process.env.BACKEND_HOST_NAME || "placeholder.onrender.com";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      // ローカル環境
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/images/**",
      },
      // 本番環境
      {
        protocol: "https",
        hostname: "*.onrender.com",
        pathname: "/images/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // cache の導入
  cacheComponents: true,
};

export default nextConfig;
