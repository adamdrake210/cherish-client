import React from 'react';
import Link from 'next/link';
import { ListItem, Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ROUTE } from '@/routes/routeConstants';

const useStyles = makeStyles<Theme>(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontSize: '1.5rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export const LoggedOutLinks = () => {
  const classes = useStyles();

  return (
    <>
      <li>
        <Link href={ROUTE.REGISTER}>
          <ListItem component="a">
            <Typography className={classes.link}>Register</Typography>
          </ListItem>
        </Link>
      </li>
      <li>
        <Link href={ROUTE.LOGIN}>
          <ListItem component="a">
            <Typography className={classes.link}>Login</Typography>
          </ListItem>
        </Link>
      </li>
    </>
  );
};
