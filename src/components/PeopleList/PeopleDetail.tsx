import React from 'react';
import PeopleAvatar from './PeopleAvatar';
import Link from 'next/link';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/system';
import { ListItem, Typography } from '@mui/material';

import { capitalizeFirstLetter } from '@/helpers/helpers';

const useStyles = makeStyles(() => ({
  link: {
    display: 'flex',
    textDecoration: 'none',
    width: '100%',
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
      <Link passHref href="/person/[personId]" as={`/person/${person.id}`}>
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
              sx={{ fontSize: '14px', color: 'red' }}
            >
              {capitalizeFirstLetter(person.relationshiptype)}
            </Typography>
          </Box>
        </a>
      </Link>
    </ListItem>
  );
};
