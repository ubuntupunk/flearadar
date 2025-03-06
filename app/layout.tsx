//app/layout.tsx

import React from 'react';

import '../styles/globals.css'; // Global CSS
import Header from './components/Header'; // Adjust the import path if necessary
import Footer from './components/Footer'; // Adjust the import path if necessary
import Head from 'next/head'; // Import Head for metadata
import Auth0ClientProvider from './components/DynamicAuth0ClientProvider';

// Define the props interface for the layout
interface RootLayoutProps {
  children: React.ReactNode;
}

// Metadata for the app (optional, replaces some getInitialProps use cases)
export const metadata: { title: string; description: string } = {
  title: 'Flearadar App',
  description: 'Access directory of informal Markets and Vendors',
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </Head>
        <Auth0ClientProvider>
          <Header isAuthenticated={false} /> {/* Pass appropriate props */}
          <main>{children}</main>
          <Footer />
        </Auth0ClientProvider>
      </body>
    </html>
  );
}
