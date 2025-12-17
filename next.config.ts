import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.api.bittengo.org",
      "bittengosagl.fra1.cdn.digitaloceanspaces.com",
      "renty-swiss.code-commando.com",
      "104.236.194.254",
      "10.0.10.45",
      "api.bittengo.org",
      
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http", // Allow HTTP protocol for localhost
        hostname: "localhost",
        port: "5000", // Specify the port your local server is running on
      },
    ],
  },
};

export default nextConfig;
