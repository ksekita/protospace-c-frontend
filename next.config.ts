import type { NextConfig } from "next";

const backendHost = process.env.BACKEND_HOST_NAME || "placeholder.onrender.com";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: backendHost,
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
