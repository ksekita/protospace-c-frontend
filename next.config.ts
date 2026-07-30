import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 他の設定があればそのまま残し、ここに追記します
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
