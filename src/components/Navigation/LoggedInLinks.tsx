import React from 'react';
import Link from 'next/link';
import { ListItem, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ROUTE } from '@/routes/routeConstants';

const useStyles = makeStyles<Theme>(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: '1.2rem',
  },
}));

export const LoggedInLinks = () => {
  const classes = useStyles();

  return (
    <>
      <ListItem sx={{ minWidth: 150 }}>
        <Link href={ROUTE.ADD_PERSON}>
          <a className={classes.link}>Add Person</a>
        </Link>
      </ListItem>
      <ListItem>
        <Link href={ROUTE.CALENDAR}>
          <a className={classes.link}>Calendar</a>
        </Link>
      </ListItem>
    </>
  );
};
