"use client";

import dynamic from 'next/dynamic';

const Auth0ClientProvider = dynamic(
  () => import('./Auth0ClientProvider').then((mod) => mod.Auth0ClientProvider),
  { ssr: false }
);

export default Auth0ClientProvider;
