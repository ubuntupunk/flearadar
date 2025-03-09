import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    env: {
        AUTH0_SECRET: '3841489890dc1b57fa8f9dcf8a23c687b624d6bb5712f6c23da5cf8168e9ef79',
        AUTH0_BASE_URL: 'http://localhost:3000',
        AUTH0_ISSUER_BASE_URL: 'https://netbones.us.auth0.com/',
        AUTH0_CLIENT_ID: 'SosF8vXh8YfCQl3VI9lennFLEAHXfnTQ',
        AUTH0_CLIENT_SECRET: 'uxrW91SF-S1Zwr3Odj6is8pRI1DL9k4QiJNB_dadJm__64CU0xlf2UWKUxYJAGEv',
    },
    images: {
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
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
};

export default nextConfig;
