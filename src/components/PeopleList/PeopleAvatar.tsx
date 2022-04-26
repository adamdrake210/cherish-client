import { Box } from '@mui/material';
import React from 'react';
import { getFirstLetter } from '../../helpers/helpers';

type Props = {
  firstName: string;
  lastName: string;
};

export default function PeopleAvatar({ firstName, lastName }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        height: 55,
        fontSize: 24,
        borderRadius: '50%',
        backgroundColor: 'primary.dark',
        color: 'white',
        mr: 2,
      }}
    >
      {getFirstLetter(firstName)}
      {getFirstLetter(lastName)}
    </Box>
  );
}
