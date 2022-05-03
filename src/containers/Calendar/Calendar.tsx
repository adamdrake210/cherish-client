import { Typography } from '@mui/material';
import React from 'react';
import CalendarList from '@/components/Calendar/CalendarList';

export default function Calendar() {
  return (
    <>
      <Typography variant="h3" component="h1">
        Calendar
      </Typography>
      <CalendarList />
    </>
  );
}
