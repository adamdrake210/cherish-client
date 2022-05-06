import React from 'react';
import { auth } from '@/services/firebase/firebase';
import { useRouter } from 'next/router';
import { ListItemIcon, Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <>
      <ListItemIcon onClick={handleLogout}>
        <Logout fontSize="small" />
      </ListItemIcon>
      <Typography>Logout</Typography>
    </>
  );
}
