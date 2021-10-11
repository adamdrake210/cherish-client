import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { ROUTE } from '@/routes/routeConstants';

export default function Fabutton() {
  return (
    <div className="fab-container">
      <Link passHref href={ROUTE.ADD_PERSON}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
}
