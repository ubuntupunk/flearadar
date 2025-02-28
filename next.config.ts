import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    env: {
        AUTH0_SECRET: '3841489890dc1b57fa8f9dcf8a23c687b624d6bb5712f6c23da5cf8168e9ef79', // Generate in Auth0 dashboard
        AUTH0_BASE_URL: 'https://flearadar.vercel.app',
        AUTH0_ISSUER_BASE_URL: 'netbones.us.auth0.com',
        AUTH0_CLIENT_ID: 'v3HCpIw2C0W8BdWi2tG3FVmIFBbhZhmG', // Found in Auth0 dashboard
        AUTH0_CLIENT_SECRET: 'DCIPKDyc7iUEGWNQyKnceDk0xpbHXZxoeCar1AQ_dUzQ6QJrrAstfy9QEgBg2oc3',
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'placehold.co',
          port: '',
          pathname: '/**',
        },
      ],
    }
};

export default nextConfig;
