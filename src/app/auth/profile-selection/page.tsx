"use client";

"use client";

"use client";

import React from 'react';
import { Button, Container, Typography, Snackbar, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

const ProfileSelectionPage: React.FC = () => {
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');

  const handleProfileSelection = async (profileType: string) => {
    try {
      const response = await fetch('/api/profile-type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileType }),
      });

      if (response.ok) {
        router.push('/auth/register-success'); // Redirect to register-success page
      } else {
        const errorData = await response.json();
        setSnackbarSeverity('error');
        setSnackbarMessage(`Failed to update profile type: ${errorData.error || 'Unknown error'}`);
        setSnackbarOpen(true);
      }
    } catch (error: any) {
      setSnackbarSeverity('error');
      setSnackbarMessage(`Failed to update profile type: ${error.message}`);
      setSnackbarOpen(true);
      console.error("Error updating profile type:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Choose your profile type
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: '8px' }}
        onClick={() => handleProfileSelection('user')}
      >
        Simple User
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: '8px' }}
        onClick={() => handleProfileSelection('vendor')}
      >
        Vendor
      </Button>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: '8px' }}
        onClick={() => handleProfileSelection('market')}
      >
        Market
      </Button>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileSelectionPage;
