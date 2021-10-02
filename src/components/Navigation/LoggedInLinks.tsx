import React from 'react';
import { ListItem, Link } from '@mui/material';

export const LoggedInLinks = () => {
  return (
    <>
      <ListItem sx={{ minWidth: 120 }}>
        <Link sx={{ textDecoration: 'none' }} href="/add-person">
          Add Person
        </Link>
      </ListItem>
      <ListItem>
        <Link sx={{ textDecoration: 'none' }} href="/calendar">
          Calendar
        </Link>
      </ListItem>
    </>
  );
};
