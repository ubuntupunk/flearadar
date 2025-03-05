//app/layout.tsx

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/globals.css'; // Global CSS
import '../styles/article.css'; // Article-specific CSS
import Header from './components/Header'; // Adjust the import path if necessary
import Footer from './components/Footer'; // Adjust the import path if necessary
import { Auth0Provider } from '@auth0/nextjs-auth0'; // Using server-side Auth0 provider
import Head from 'next/head'; // Import Head for metadata

// Define the props interface for the layout
interface RootLayoutProps {
  children: React.ReactNode;
}

// Metadata for the app (optional, replaces some getInitialProps use cases)
export const metadata: { title: string; description: string } = {
  title: 'Flearadar App',
  description: 'Access directory of informal Markets and Vendors',
};

// Auth0 redirectUri needs window.location.origin, handled dynamically
const redirectUri: string = typeof window !== 'undefined' ? window.location.origin : '';


export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body>
        <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </Head>
        <Auth0Provider
          clientId="AT0KJzvX5F2CbR9TmYfhj18oLXe92U2z"
          domain="netbones.us.auth0.com"
          redirectUri={redirectUri}
        >
          <Header isAuthenticated={false} /> {/* Pass appropriate props */}
          <main>{children}</main>
          <Footer />
        </Auth0Provider>
      </body>
    </html>
  );
}