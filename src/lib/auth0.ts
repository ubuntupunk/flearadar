// src/lib/auth0.ts
import {
  getAccessToken,
  handleLogout,
  handleCallback,
  handleProfile,
} from '@auth0/nextjs-auth0'; // Root import

const auth0Config = {
  secret: process.env.AUTH0_SECRET!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  baseURL: process.env.AUTH0_BASE_URL!,
  clientID: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
};

export const auth0 = {
  getAccessToken: (req: Request) => getAccessToken(req, auth0Config),
  handleLogin: withPageAuthRequired,
  handleLogin: (req: Request, res: Response) => handleLogin(req, res, auth0Config),
  handleCallback: (req: Request) => handleCallback(req, auth0Config),
  handleProfile: (req: Request) => handleProfile(req, auth0Config),
};

export default auth0;