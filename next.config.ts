import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
    // Add domain configuration for better SEO and analytics
  experimental: {
    serverActions: {
      allowedOrigins: ['orba.work', 'docs.orba.work', 'www.orba.work'],
    },
  },
};

export default nextConfig;
