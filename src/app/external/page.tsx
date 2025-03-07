//app/external/page.tsx
'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useUser, UserProfile, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import Highlight from '../components/Highlight';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Define the state type (adjust response type based on your API)
interface FetchState {
  isLoading: boolean;
  response: unknown | undefined; // Use 'any' temporarily; replace with actual type (e.g., { shows: string[] })
  error: string | undefined;
}

interface ShowsResponse {
  shows: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// Define component props
interface ExternalProps {}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line react/display-name
function External(/* props: ExternalProps */): JSX.Element {
  const [state, setState] = useState<FetchState>({
    isLoading: false,
    response: undefined,
    error: undefined,
  });

  const callApi = async () => {
    setState((previous) => ({ ...previous, isLoading: true }));

    try {
      const response = await fetch('/api/shows');
      const data = await response.json();
      setState((previous) => ({ ...previous, response: data, error: undefined, isLoading: false }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setState((previous) => ({ ...previous, error: errorMessage, isLoading: false }));
    }
    // No need for finally since isLoading is handled in both try and catch
  };

  const handle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, fn: () => Promise<void>) => {
    event.preventDefault();
    fn();
  };

  const { isLoading, response, error } = state;

  return (
    <>
      <div className="mb-5" data-testid="external">
        <h1 data-testid="external-title">External API</h1>
        <div data-testid="external-text">
          <p className="lead">Ping an external API by clicking the button below</p>
          <p>
            This will call a local API on port 3001 that would have been started if you run <code>npm run dev</code>.
          </p>
          <p>
            An access token is sent as part of the {`request's`} <code>Authorization</code> header and the API will validate
            it using the {`API's`} audience value. The audience is the identifier of the API that you want to call (see{/* eslint-disable-next-line react/no-unescaped-entities */` `}
            <a href="https://auth0.com/docs/get-started/dashboard/tenant-settings#api-authorization-settings">
              API Authorization Settings
            </a>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            for more info).
          </p>
        </div>
        <Button
          color="primary"
          className="mt-5"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handle(e, callApi)}
          data-testid="external-action"
        >
          Ping API
        </Button>
      </div>
      <div className="result-block-container">
            {isLoading && <Loading />}
            {(error || response) && (
              <div className="result-block" data-testid="external-result">
                <h6 className="muted">Result</h6>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Highlight testId="external-response">{JSON.stringify(response, null, 2)}</Highlight>
              </div>
            )}
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default withPageAuthRequired(External, {
  onRedirecting: () => <Loading />,
  onError: (error: Error) => <ErrorMessage>{error.message}</ErrorMessage>,
})
