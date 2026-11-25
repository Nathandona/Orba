import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // Performance optimizations
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [{ protocol: 'http', hostname: 'localhost' }],
    formats: ['image/webp', 'image/avif'],
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Add domain configuration for better SEO and analytics
  experimental: {
    serverActions: {
      allowedOrigins: ['orba.work', 'docs.orba.work', 'www.orba.work'],
    },
  },
};

export default nextConfig;
