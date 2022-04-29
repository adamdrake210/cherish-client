import React from 'react';
import Link from 'next/link';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/system';
import { ListItem, Theme, Typography } from '@mui/material';

import PeopleAvatar from './PeopleAvatar';
import { capitalizeFirstLetter } from '@/helpers/helpers';
import { ROUTE } from '@/routes/routeConstants';

const useStyles = makeStyles<Theme>(theme => ({
  link: {
    display: 'flex',
    textDecoration: 'none',
    width: '100%',
    color: theme.palette.primary.contrastText,
  },
}));

type Props = {
  person: {
    id: string;
    firstName: string;
    lastName: string;
    relationshiptype: string;
  };
};

export const PeopleDetail = ({ person }: Props) => {
  const classes = useStyles();
  return (
    <ListItem
      sx={{
        py: 2,
        px: 0,
        width: '100%',
        borderBottom: '1px solid red',
      }}
    >
      <Link
        passHref
        href={ROUTE.VIEW_PERSON_DETAIL}
        as={`/person/${person.id}`}
      >
        <a className={classes.link}>
          <PeopleAvatar
            firstName={person.firstName}
            lastName={person.lastName}
          />
          <Box>
            <Typography
              variant="h5"
              component="p"
            >{`${person.firstName} ${person.lastName}`}</Typography>
            <Typography
              variant="body2"
              component="span"
              sx={{ fontSize: '14px' }}
            >
              {capitalizeFirstLetter(person.relationshiptype)}
            </Typography>
          </Box>
        </a>
      </Link>
    </ListItem>
  );
};
