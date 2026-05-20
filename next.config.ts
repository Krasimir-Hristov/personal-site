import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    const rules = [
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/#projects',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#about',
        permanent: true,
      },
      {
        source: '/specializations',
        destination: '/#specializations',
        permanent: true,
      },
    ];

    // Admin is local-only — redirect to home in production
    if (process.env.NODE_ENV === 'production') {
      rules.push({
        source: '/admin/:path*',
        destination: '/',
        permanent: false,
      });
    }

    return rules;
  },
};

export default nextConfig;
