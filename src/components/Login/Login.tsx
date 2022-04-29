import { Box, Typography } from '@mui/material';
import React from 'react';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        py: 4,
      }}
    >
      <Typography component="h1" variant="h3" gutterBottom>
        Login
      </Typography>
      <LoginForm />
    </Box>
  );
}
