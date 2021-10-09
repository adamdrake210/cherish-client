import React from 'react';
import { Box } from '@mui/system';

import { capitalizeFirstLetter } from '@/helpers/helpers';
import { RelationshipType } from '@/types/types';
import BirthdayDetails from './BirthdayDetails';
import { Typography } from '@mui/material';

type Props = {
  relationship: RelationshipType;
};

export default function RelationshipDetails({ relationship }: Props) {
  const {
    firstName,
    lastName,
    birthday,
    birthmonth,
    birthyear,
    relationshiptype,
  } = relationship;

  return (
    <Box sx={{ my: 2 }}>
      <Typography>
        <strong>{capitalizeFirstLetter(relationshiptype)}</strong> - {firstName}{' '}
        {lastName}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Typography sx={{ fontWeight: 700, mr: 1 }}>Birthday:</Typography>
        <Typography>
          <BirthdayDetails
            birthday={birthday}
            birthmonth={birthmonth}
            birthyear={birthyear}
          />
        </Typography>
      </Box>
    </Box>
  );
}
