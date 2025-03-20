"use client";

import React from 'react';
import { Container, Typography } from '@mui/material';

const RegisterSuccessPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Registration Successful!
      </Typography>
      <Typography variant="body1">
        Thank you for registering. Please check your email to verify your account.
      </Typography>
    </Container>
  );
};

export default RegisterSuccessPage;
