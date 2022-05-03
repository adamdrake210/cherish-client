import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, List, Typography, Link as MuiLink } from '@mui/material';

import { getPeople } from '@/services/firebase/firebaseapi';
import { useUserContext } from '@/context/userContext';
import { sortLastName } from '@/helpers/helpers';
import Fabutton from '../Common/Buttons/Fabutton';
import { SearchField } from '../Forms/Fields/SearchField';
import { PeopleDetail } from './PeopleDetail';
import { ROUTE } from '@/routes/routeConstants';
import { useQuery } from 'react-query';
import Loading from '../Common/Loaders/Loading';

function People() {
  const [peopleList, setPeopleList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { user } = useUserContext();

  const {
    data: people,
    isLoading,
    error,
    isError,
  } = useQuery(['people', user.uid], () => getPeople(user.uid));

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

  useEffect(() => {
    setPeopleList(people?.docs.map(person => person));
    setFilteredList(people?.docs.map(person => person));
  }, [people]);

  return (
    <Loading error={error as Error} isError={isError} isLoading={isLoading}>
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
