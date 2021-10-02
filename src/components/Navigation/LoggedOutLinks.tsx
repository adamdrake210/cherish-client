import React from 'react';
import { ListItem, Link } from '@mui/material';

export const LoggedOutLinks = () => {
  return (
    <>
      <ListItem>
        <Link sx={{ textDecoration: 'none' }} href="/register">
          Register
        </Link>
      </ListItem>
      <ListItem>
        <Link sx={{ textDecoration: 'none' }} href="/login">
          Login
        </Link>
      </ListItem>
    </>
  );
};
