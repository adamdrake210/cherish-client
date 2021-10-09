import React from 'react';
import Link from 'next/link';
import { ListItem, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles<Theme>(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: '1.2rem',
  },
}));

export const LoggedOutLinks = () => {
  const classes = useStyles();

  return (
    <>
      <ListItem sx={{ minWidth: 150 }}>
        <Link href="/register">
          <a className={classes.link}>Register</a>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/login">
          <a className={classes.link}>Login</a>
        </Link>
      </ListItem>
    </>
  );
};
