import React from 'react';
import { Box, Typography } from '@mui/material';
import AddPersonForm from '@/components/Forms/AddPersonForm';

export default function AddPerson() {
  return (
    <Box>
      <Typography component="h1" variant="h4" color="primary" gutterBottom>
        Add Person
      </Typography>
      <AddPersonForm />
    </Box>
  );
}
