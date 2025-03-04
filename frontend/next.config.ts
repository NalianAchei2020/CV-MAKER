import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  swcMinify: false,
  env: {
    GEMINA_API_ONE: process.env.GEMINA_API_ONE,
    GEMINA_API_TWO: process.env.GEMINA_API_TWO,
  },
};

export default nextConfig;
