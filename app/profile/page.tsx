// app/profile/page.tsx
'use client';

import React from 'react';
import { Row, Col } from 'reactstrap';
import { useUser, withPageAuthRequired, UserProfile, WithPageAuthRequiredProps } from '@auth0/nextjs-auth0/client';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';

// Define component props (extending Auth0 props if needed)
interface ProfileProps extends WithPageAuthRequiredProps {
  // Add additional props here if needed in the future
}

function Profile(/* props: ProfileProps */): JSX.Element {
  const { user, isLoading }: { user: UserProfile | undefined; isLoading: boolean } = useUser();

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left" data-testid="profile">
            <Col md={2}>
              <img
                src={user.picture as string} // Type assertion since picture is optional in UserProfile
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                decoding="async" // Changed decode to decoding for correct HTML attribute
                data-testid="profile-picture"
              />
            </Col>
            <Col md>
              <h2 data-testid="profile-name">{user.name}</h2>
              <p className="lead text-muted" data-testid="profile-email">
                {user.email}
              </p>
            </Col>
          </Row>
          <Row data-testid="profile-json">
            <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
          </Row>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: (error: Error) => <ErrorMessage>{error.message}</ErrorMessage>,
});