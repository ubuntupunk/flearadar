import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    env: {
        AUTH0_BASE_URL: 'https://flearadar.vercel.app',
        AUTH0_ISSUER_BASE_URL: 'netbones.us.auth0.com',
        AUTH0_CLIENT_ID: 'AT0KJzvX5F2CbR9TmYfhj18oLXe92U2z', // Found in Auth0 dashboard
        AUTH0_CLIENT_SECRET: 'BZGxj3ytnxekFdG1Uu-q0dqvAEolUOn9Yf-S5NarA5NCtii71XlZvdA4H-WWhAGA' // Found in Auth0 dashboard
    }
  };



export default nextConfig;
