// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/globals.css'; // Import your global CSS if you have one
import '../styles/article.css';

import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      clientId="AT0KJzvX5F2CbR9TmYfhj18oLXe92U2z"
      domain="netbones.us.auth0.com"
      redirectUri={typeof window !== 'undefined' ? window.location.origin : ''} // Check if window is defined
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;