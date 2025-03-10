// src/lib/auth0.ts

import { Auth0Client } from "@auth0/nextjs-auth0/server"

const auth0Config = {
  secret: process.env.AUTH0_SECRET!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  baseURL: process.env.AUTH0_BASE_URL!,
  clientID: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
};

export const auth0 = new Auth0Client()