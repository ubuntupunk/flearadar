// app/profile/page.tsx
'use client';

import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Row, Col } from 'reactstrap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Highlight from '../components/Highlight';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// eslint-disable-next-line @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Profile(): JSX.Element {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <Row className="align-items-center profile-header mb-5 text-center text-md-left" data-testid="profile">
            <Col md={2}>
              <Image
                src={user.picture as string}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                decoding="async"
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
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
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
