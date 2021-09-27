import React from 'react';
import People from '../../components/People';
import HomepageNotLoggedIn from '../../components/HomepageNotLoggedIn';
import Loader from '../../components/Loader';
import { useUserContext } from '../../context/userContext';

export default function Homepage() {
  const { user, isLoading } = useUserContext();

  return (
    <div>
      <div>
        {isLoading && <Loader />}
        {!isLoading && user && <People />}
        {!isLoading && !user && <HomepageNotLoggedIn />}
      </div>
    </div>
  );
}
