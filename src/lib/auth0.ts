// src/lib/auth0.ts
import { Auth0Client } from '@auth0/auth0-spa-js';

const auth0 = new Auth0Client({
  domain: process.env.AUTH0_ISSUER_BASE_URL!,
  clientId: process.env.AUTH0_CLIENT_ID!,
});

export const getSession = async () => {
  const isAuthenticated = await auth0.isAuthenticated();
  if (isAuthenticated) {
    const user = await auth0.getUser();
    return { user };
  }
  return null;
};

export const loginWithRedirect = async () => {
  await auth0.loginWithRedirect({
    authorizationParams: {
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth0/callback`,
    },
  });
};

export const logout = async () => {
  await auth0.logout({
    logoutParams: {
      returnTo: `${process.env.NEXT_PUBLIC_APP_URL}`,
    },
  });
};
