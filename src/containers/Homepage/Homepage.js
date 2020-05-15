import React from 'react';
import People from '../../components/People';
import HomepageNotLoggedIn from '../../components/HomepageNotLoggedIn';
import { useUserContext } from '../../context/userContext';

export default function Homepage() {
  const { user } = useUserContext();

  return (
    <div>
      <div>
        {user ? (
          <>
            <People />
          </>
        ) : (
          <HomepageNotLoggedIn />
        )}
      </div>
    </div>
  );
}
