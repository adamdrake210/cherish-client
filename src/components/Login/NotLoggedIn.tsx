import React from 'react';
import Link from 'next/link';
import { Box, Typography, Link as MuiLink } from '@mui/material';

import { ROUTE } from '@/routes/routeConstants';

export default function NotLoggedIn() {
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
      <Typography component="p" variant="h5" gutterBottom>
        Cherish those close to you
      </Typography>
      <Typography
        component="h1"
        variant="h3"
        sx={{ textAlign: 'center' }}
        gutterBottom
      >
        Your own private <br />
        online address book
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Link href={ROUTE.REGISTER}>
          <MuiLink
            sx={{
              fontSize: '2rem',
              color: 'secondary.dark',
              ':hover': { cursor: 'pointer' },
            }}
          >
            Sign Up
          </MuiLink>
        </Link>{' '}
        <Typography sx={{ fontSize: '2rem', mx: 2 }}> / </Typography>
        <Link href={ROUTE.LOGIN}>
          <MuiLink sx={{ fontSize: '2rem', ':hover': { cursor: 'pointer' } }}>
            Login
          </MuiLink>
        </Link>
      </Box>
    </Box>
  );
}
