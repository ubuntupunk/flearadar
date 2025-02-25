import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  module.exports = {
    env: {
      AUTH0_SECRET: 'your-auth0-secret', // Generate in Auth0 dashboard
      AUTH0_BASE_URL: 'https://your-vercel-app.vercel.app',
      AUTH0_ISSUER_BASE_URL: 'https://your-auth0-tenant.auth0.com',
      AUTH0_CLIENT_ID: 'your-auth0-client-id', // Found in Auth0 dashboard
      AUTH0_CLIENT_SECRET: 'your-auth0-client-secret', // Found in Auth0 dashboard
    },
  };

};


export default nextConfig;
