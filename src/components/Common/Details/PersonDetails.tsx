import React from 'react';
import { List, ListItem, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import BirthdayDetails from './BirthdayDetails';
import { capitalizeFirstLetter } from '@/helpers/helpers';
import { Box } from '@mui/system';

const useStyles = makeStyles(() => ({
  listItem: {
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
      <List sx={{ color: 'primary.main' }}>
        <ListItem>
          <Typography variant="body1" className={classes.listItem}>
            Birthday:
          </Typography>
          <Typography variant="body1">
            <BirthdayDetails
              birthday={birthday}
              birthmonth={birthmonth}
              birthyear={birthyear}
            />
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1" className={classes.listItem}>
            Notes:
          </Typography>
          <Typography variant="body1">
            {notes || 'No comments at this time.'}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1" className={classes.listItem}>
            Relationship:
          </Typography>
          <Typography variant="body1">
            {capitalizeFirstLetter(relationshiptype) ||
              'Relationship needs updating'}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body1" className={classes.listItem}>
            Email:
          </Typography>
          {email ? (
            <Typography variant="body1">
              <a
                href={`mailto:${email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {email}
              </a>
            </Typography>
          ) : (
            <Typography variant="body1">No email set at this time.</Typography>
          )}
        </ListItem>
        <ListItem>
          <Typography variant="body1" className={classes.listItem}>
            Address:
          </Typography>
          <Typography variant="body1">
            {address || 'No address at this time'}
          </Typography>
        </ListItem>
        <ListItem>
          {links.length > 0 && links[0] !== '' ? (
            <>
              <span>
                <Typography variant="body1" className={classes.listItem}>
                  Useful Links:
                </Typography>
              </span>
              <List>
                {links.map(link => (
                  <ListItem key={link}>
                    <Typography variant="body1">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Typography variant="body1">No links at this time.</Typography>
          )}
        </ListItem>
      </List>
    </Box>
  );
}
