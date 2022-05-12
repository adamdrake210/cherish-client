import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, List, Typography, Link as MuiLink, Button } from '@mui/material';

import { getPeople } from '@/services/firebase/firebaseapi';
import { useUserContext } from '@/context/userContext';
import { sortLastName } from '@/helpers/helpers';
import Fabutton from '../Common/Buttons/Fabutton';
import { SearchField } from '../Forms/Fields/SearchField';
import { PeopleDetail } from './PeopleDetail';
import { ROUTE } from '@/routes/routeConstants';
import { useQuery } from 'react-query';
import Loading from '../Common/Loaders/Loading';
import { LOCAL_DEV_URL, PROD_URL, RQ_KEY_PEOPLE } from '@/constants/constants';

function People() {
  const [peopleList, setPeopleList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { user } = useUserContext();

  const {
    data: people,
    isLoading,
    error,
    isError,
  } = useQuery([RQ_KEY_PEOPLE, user.uid], () => getPeople(user.uid));

  function handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== '') {
      currentList = peopleList;
      newList = currentList.filter(item => {
        const firstNameLowerCase = item.data().firstName.toLowerCase();
        const lastNameLowerCase = item.data().lastName.toLowerCase();
        const filterLowerCase = e.target.value.toLowerCase();
        return (
          firstNameLowerCase.includes(filterLowerCase) ||
          lastNameLowerCase.includes(filterLowerCase)
        );
      });
    } else {
      newList = peopleList;
    }

    const sortedNewList = sortLastName(newList);
    setFilteredList(sortedNewList);
  }

  const handleEmailSend = async () => {
    const res = await fetch(
      `${
        process.env.NODE_ENV !== 'production' ? LOCAL_DEV_URL : PROD_URL
      }api/send-email-api`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    const formattedResponse = await res.json();
    // eslint-disable-next-line no-console
    console.log('formattedResponse:', formattedResponse);
    return formattedResponse;
  };

  useEffect(() => {
    setPeopleList(people?.docs.map(person => person));
    setFilteredList(people?.docs.map(person => person));
  }, [people]);

  return (
    <Loading error={error as Error} isError={isError} isLoading={isLoading}>
      <Button variant="contained" onClick={handleEmailSend}>
        Send Email
      </Button>

      <SearchField handleChange={handleChange} />
      <Typography component="h2" variant="h4" sx={{ mt: 2 }}>
        All Contacts
      </Typography>
      {filteredList?.length > 0 ? (
        <List sx={{ maxWidth: 500, width: '100%', mt: 0 }}>
          {filteredList.map(person => (
            <PeopleDetail key={person.id} person={person} />
          ))}
        </List>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <p>No People have been added yet</p>
          <Link passHref href={ROUTE.ADD_PERSON}>
            <MuiLink
              sx={{
                color: 'text.primary',
                ':hover': { color: 'text.secondary' },
              }}
            >
              Add Your First Person!
            </MuiLink>
          </Link>
        </Box>
      )}
      <Fabutton />
    </Loading>
  );
}

export default People;
