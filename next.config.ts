import type { NextConfig } from "next";

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
};

export default nextConfig;
