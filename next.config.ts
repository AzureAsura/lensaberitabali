import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.3'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "qlpjgzr7ahptdz0n.public.blob.vercel-storage.com"
      },
      {
        protocol: 'https',
        hostname: "*.private.blob.vercel-storage.com"
      }
    ],
  },

};

export default nextConfig;
