import type { NextConfig } from "next";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ["localhost", "flearadar.supabase.co", "placehold.co", "flearadar.vercel.app"],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'placehold.co',
            port: '',
            pathname: '/**',
          },
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
    },
    };


export default nextConfig;
