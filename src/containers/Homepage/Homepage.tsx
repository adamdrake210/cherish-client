import React from 'react';
import { Box } from '@mui/system';

import People from '../../components/PeopleList/People';
import HomepageNotLoggedIn from '../../components/HomepageNotLoggedIn';
import Loader from '../../components/Loader';
import { useUserContext } from '../../context/userContext';

export default function Homepage() {
  const { user, isLoading } = useUserContext();

  return (
    <Box sx={{ backgroundColor: 'background.paper', fontFamily: 'Raleway' }}>
      {isLoading && <Loader />}
      {!isLoading && user && <People />}
      {!isLoading && !user && <HomepageNotLoggedIn />}
    </Box>
  );
}
