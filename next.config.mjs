import NextConfig  from "next";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  /* config options here */
    images: { 
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'http',
            hostname: '**',
            port: '',
            pathname: '/**',
          },
        ],
        unoptimized: true,
    },
    };


export default nextConfig;
