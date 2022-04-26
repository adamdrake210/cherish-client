import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { ROUTE } from '@/routes/routeConstants';
import { Box } from '@mui/material';

export default function Fabutton() {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
      }}
    >
      <Link passHref href={ROUTE.ADD_PERSON}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
}
