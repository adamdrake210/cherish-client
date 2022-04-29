import { Box, Typography } from '@mui/material';
import React from 'react';
import RegisterForm from '@/components/Register/RegisterForm';

export default function Register() {
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
        Create Account
      </Typography>
      <RegisterForm />
    </Box>
  );
}
