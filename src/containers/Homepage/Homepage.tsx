import React from 'react';

import People from '@/components/PeopleList/People';
import NotLoggedIn from '@/components/Login/NotLoggedIn';
import Loader from '@/components/Common/Loaders/Loader';
import { useUserContext } from '@/context/userContext';

export default function Homepage() {
  const { user, isLoading } = useUserContext();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && user && <People />}
      {!isLoading && !user && <NotLoggedIn />}
    </>
  );
}
