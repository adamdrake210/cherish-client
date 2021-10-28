import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Box } from '@mui/material';

export default function Loader() {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ mb: 4 }} size={45} color="secondary" />
        <Typography color="secondary" variant="h6">
          Loading...
        </Typography>
      </Box>
    </Box>
  );
}
