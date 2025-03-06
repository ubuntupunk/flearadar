"use client";

import { Auth0Provider } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';

interface Auth0ClientProviderProps {
  children: React.ReactNode;
}

import { useEffect, useState } from 'react';

interface Auth0ClientProviderProps {
  children: React.ReactNode;
}

export function Auth0ClientProvider({ children }: Auth0ClientProviderProps) {
  const router = useRouter();
  const [redirectUri, setRedirectUri] = useState('');

  useEffect(() => {
    setRedirectUri(window.location.origin);
  }, []);

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ""}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ""}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
