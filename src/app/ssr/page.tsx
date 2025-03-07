// app/ssr/page.tsx
import React from 'react';
import { getSession, withPageAuthRequired, UserProfile } from '@auth0/nextjs-auth0/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Highlight from '../components/Highlight';

// Define the props interface (though not directly used due to async nature)
interface SSRPageProps {
  // No props needed currently, but can be extended if additional props are passed
}

// Wrap the async component with withPageAuthRequired
export default withPageAuthRequired(
  async function SSRPage(): Promise<JSX.Element> {
    const session = await getSession();
    const user: UserProfile = session?.user as UserProfile; // Type assertion since getSession can return null

    return (
      <>
        <div className="mb-5" data-testid="ssr">
          <h1 data-testid="ssr-title">Server-side Rendered Page</h1>
          <div data-testid="ssr-text">
            <p>
              You can protect a server-side rendered page by wrapping it with <code>withPageAuthRequired</code>. Only
              logged in users will be able to access it. If the user is logged out, they will be redirected to the login
              page instead.{' '}
            </p>
          </div>
        </div>
        <div className="result-block-container" data-testid="ssr-json">
          <div className="result-block">
            <h6 className="muted">User</h6>
            <Highlight testId="highlight">{JSON.stringify(user, null, 2)}</Highlight>
          </div>
        </div>
      </>
    );
  },
  { returnTo: '/ssr' }
);
