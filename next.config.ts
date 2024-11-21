import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React strict mode to highlight potential issues during development
  images: {
    remotePatterns: [
      {
        protocol: "https", // Use 'https' for Cloudinary
        hostname: "res.cloudinary.com", // Cloudinary's domain
        port: "", // Leave empty for default ports
        pathname: "/**", // Match all paths
      },
    ],
  },
};

export default nextConfig;
