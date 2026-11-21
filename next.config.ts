import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.3'],
  // Default is 1MB; berita images (max 4MB, enforced in lib/blob.ts) are sent through the server action. Extra 1MB for text fields.
  experimental: { serverActions: { bodySizeLimit: '5mb' } },
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
