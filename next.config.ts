import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      // Root path on docs.orba.work goes to /docs
      {
        source: '/',
        has: [{ type: 'host', value: 'docs.orba.work' }],
        destination: '/docs',
      },
      // Handle docs subdomain - route all traffic to docs routes
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'docs.orba.work' }],
        destination: '/docs/:path*',
      },
      // Handle main domain - keep as is
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'orba.work' }],
        destination: '/:path*',
      },
      // Handle www subdomain - redirect to main domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.orba.work' }],
        destination: 'https://orba.work/:path*',
      }
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
