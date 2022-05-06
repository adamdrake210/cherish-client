import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { Box, Typography, Link as MuiLink } from '@mui/material';

import { getPeople, getRelationships } from '@/services/firebase/firebaseapi';
import { useUserContext } from '@/context/userContext';
import { formatDate, sortBirthdays } from '@/helpers/dateHelpers';
import {
  monthsArray,
  RQ_KEY_PEOPLE,
  RQ_KEY_RELATIONSHIPS,
} from '@/constants/constants';
import AgeDetails from '@/components/Common/Details/AgeDetails';
import Fabutton from '@/components/Common/Buttons/Fabutton';
import { ROUTE } from '@/routes/routeConstants';
import Loading from '../Common/Loaders/Loading';

function convertBirthdaysToSortedList(array, month) {
  const birthdayArray = [];

  array.map(arr => {
    if (arr.data().birthmonth === month) {
      birthdayArray.push(arr);
    }
  });

  return sortBirthdays(birthdayArray);
}

export default function CalendarList() {
  const [, setCurrentMonth] = useState(0);
  const { user } = useUserContext();

  const {
    data: relationships,
    isLoading,
    error,
    isError,
  } = useQuery([RQ_KEY_RELATIONSHIPS, user.uid], () =>
    getRelationships(user.uid, 'userId'),
  );

  const {
    data: people,
    isLoading: isLoadingPeople,
    error: errorPeople,
    isError: isErrorPeople,
  } = useQuery([RQ_KEY_PEOPLE, user.uid], () => getPeople(user.uid));

  function makeBirthdayList(month) {
    return (
      <Box key={month} sx={{ my: 1 }}>
        <Typography variant="h5" component="h2">
          {month}
        </Typography>
        <ul className="calendar-birthday-list">
          {convertBirthdaysToSortedList(
            [...people.docs, ...relationships.docs],
            month,
          ).map(person => (
            <li key={person.id}>
              <Box className="person-details">
                <Typography gutterBottom variant="body1">
                  {`${person.data().birthday} ${person.data().birthmonth} - `}
                  <Link
                    passHref
                    href={ROUTE.VIEW_PERSON_DETAIL}
                    as={`/person/${
                      person.data().peopleId
                        ? person.data().peopleId
                        : person.id
                    }`}
                  >
                    <MuiLink
                      sx={{
                        color: 'text.primary',
                        ':hover': { color: 'text.secondary' },
                      }}
                    >{`${person.data().firstName} ${
                      person.data().lastName
                    }`}</MuiLink>
                  </Link>{' '}
                  -{' '}
                  <AgeDetails
                    birthday={person.data().birthday}
                    birthmonth={person.data().birthmonth}
                    birthyear={person.data().birthyear}
                  />
                </Typography>
              </Box>
            </li>
          ))}
        </ul>
      </Box>
    );
  }

  useEffect(() => {
    setCurrentMonth(new Date().getMonth());
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
      <Typography gutterBottom variant="h6">
        Today is <strong>{formatDate()}</strong>
      </Typography>

      <Loading
        error={(error as Error) || (errorPeople as Error)}
        isError={isError || isErrorPeople}
        isLoading={isLoading || isLoadingPeople}
      >
        {people && relationships && (
          <>
            {monthsArray.map(month => {
              return makeBirthdayList(month);
            })}
          </>
        )}
      </Loading>
      <Fabutton />
    </Box>
  );
}
