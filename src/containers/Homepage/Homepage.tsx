import React from 'react';

import People from '../../components/PeopleList/People';
import HomepageNotLoggedIn from '../../components/HomepageNotLoggedIn';
import Loader from '../../components/Loader';
import { useUserContext } from '../../context/userContext';

export default function Homepage() {
  const { user, isLoading } = useUserContext();

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && user && <People />}
      {!isLoading && !user && <HomepageNotLoggedIn />}
    </>
  );
}
