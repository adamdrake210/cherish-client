import React from 'react';
import { Box, Typography } from '@mui/material';
import PersonForm from '@/components/Forms/PersonForm';

export default function AddPerson() {
  return (
    <Box>
      <Typography component="h1" variant="h3" gutterBottom>
        Add Person
      </Typography>
      <PersonForm />
    </Box>
  );
}
