//app/layout.tsx

import React from 'react';

import '../styles/globals.css'; // Global CSS
import Header from '../components/Header'; // Adjust the import path if necessary
import Footer from '../components/Footer'; // Adjust the import path if necessary
import Head from 'next/head'; // Import Head for metadata
import { AuthProvider } from '@/lib/providers/auth-provider'; // Import AuthProvider

// Define the props interface for the layout
interface RootLayoutProps {
  children: React.ReactNode;
}

// Metadata for the app (optional, replaces some getInitialProps use cases)
export const metadata: { title: string; description: string } = {
  title: 'Flearadar App',
  description: 'Access directory of informal Markets and Vendors',
};

export default function RootLayout({ children }: RootLayoutProps): React.ReactNode {


  return (
    <html lang="en">
      <body>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
           integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
           crossOrigin="" />
          <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin="">
          </script>
        </Head>
        <AuthProvider> {/* Wrap children with AuthProvider */}
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
