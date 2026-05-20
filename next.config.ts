import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Admin is local-only — redirect to home in production
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/admin/:path*',
          destination: '/',
          permanent: false,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
