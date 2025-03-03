//app/layout.tsx

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/globals.css'; // Global CSS
import '../styles/article.css'; // Article-specific CSS

import React from 'react';
import { Auth0Provider } from '@auth0/nextjs-auth0'; // Using server-side Auth0 provider

// Define the props interface for the layout
interface RootLayoutProps {
  children: React.ReactNode;
}

// Metadata for the app (optional, replaces some getInitialProps use cases)
export const metadata: { title: string; description: string } = {
  title: 'My Vercel App',
  description: 'Powered by Next.js and Auth0',
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  // Auth0 redirectUri needs window.location.origin, handled dynamically
  const redirectUri: string = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <html lang="en">
      <body>
        <Auth0Provider
          clientId="AT0KJzvX5F2CbR9TmYfhj18oLXe92U2z"
          domain="netbones.us.auth0.com"
          redirectUri={redirectUri}
        >
          {children} {/* Replaces <Component {...pageProps} /> */}
        </Auth0Provider>
      </body>
    </html>
  );
}