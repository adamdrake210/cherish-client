import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/system';

import BirthdayDetails from './BirthdayDetails';
import { capitalizeFirstLetter } from '@/helpers/helpers';

const useStyles = makeStyles(() => ({
  listItem: {
    paddingLeft: 0,
  },
  listItemText: {
    fontWeight: 700,
    marginRight: '6px',
  },
}));

type Props = {
  person: any;
};

export default function PersonDetails({ person }: Props) {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    email,
    address,
    birthday,
    birthmonth,
    birthyear,
    relationshiptype,
    notes,
    links,
  } = person;

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h4" component="h2">
        {firstName} {lastName}
      </Typography>
      <List>
        <ListItem className={classes.listItem}>
          <Typography className={classes.listItemText}>Birthday:</Typography>
          <Typography>
            <BirthdayDetails
              birthday={birthday}
              birthmonth={birthmonth}
              birthyear={birthyear}
            />
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Typography className={classes.listItemText}>Notes:</Typography>
          <Typography>{notes || 'No comments at this time.'}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Typography className={classes.listItemText}>
            Relationship:
          </Typography>
          <Typography>
            {capitalizeFirstLetter(relationshiptype) ||
              'Relationship needs updating'}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Typography className={classes.listItemText}>Email:</Typography>
          {email ? (
            <Typography>
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {email}
              </a>
            </Typography>
          ) : (
            <Typography>No email set at this time.</Typography>
          )}
        </ListItem>
        <ListItem className={classes.listItem}>
          <Typography className={classes.listItemText}>Address:</Typography>
          <Typography>{address || 'No address at this time'}</Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          {links.length > 0 && links[0] !== '' ? (
            <>
              <span>
                <Typography className={classes.listItemText}>
                  Useful Links:
                </Typography>
              </span>
              <List>
                {links.map(link => (
                  <ListItem key={link}>
                    <Typography>
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Typography>No links at this time.</Typography>
          )}
        </ListItem>
      </List>
    </Box>
  );
}
