"use client";

import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const ProfileSelectionPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Choose your profile type
      </Typography>
      <Button variant="contained" color="primary" style={{ margin: '8px' }}>
        Simple User
      </Button>
      <Button variant="contained" color="primary" style={{ margin: '8px' }}>
        Vendor
      </Button>
      <Button variant="contained" color="primary" style={{ margin: '8px' }}>
        Market
      </Button>
    </Container>
  );
};

export default ProfileSelectionPage;
