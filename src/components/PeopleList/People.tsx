import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Box } from '@mui/system';
import { List, Typography } from '@mui/material';

import { getPeople } from '@/services/firebase/firebaseapi';
import { useUserContext } from '@/context/userContext';
import { sortLastName } from '@/helpers/helpers';
import Fabutton from '../Fabutton';
import { SearchField } from '../Forms/Fields/SearchField';
import { PeopleDetail } from './PeopleDetail';

function People() {
  const [isLoading, setIsLoading] = useState(true);
  const [peopleList, setPeopleList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const { user } = useUserContext();

  function handleSnapshot(snapshot) {
    const peopleArray = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setPeopleList(sortLastName(peopleArray));
    setFilteredList(sortLastName(peopleArray));
    setIsLoading(false);
  }

  useEffect(() => {
    getPeople(user.uid, handleSnapshot);
  }, []);

  function handleChange(e) {
    let currentList = [];
    let newList = [];

    if (e.target.value !== '') {
      currentList = peopleList;
      newList = currentList.filter(item => {
        const firstNameLowerCase = item.firstName.toLowerCase();
        const lastNameLowerCase = item.lastName.toLowerCase();
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

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        maxWidth: 900,
        minHeight: '100vh',
        m: '0 auto',
        p: [2, 4],
        mt: 5,
      }}
    >
      <SearchField handleChange={handleChange} />
      <Typography component="h2" variant="h4" sx={{ mt: 2 }}>
        All Contacts
      </Typography>
      {filteredList && (
        <List sx={{ maxWidth: 500, width: '100%', mt: 0 }}>
          {filteredList.map(person => (
            <PeopleDetail key={person.id} person={person} />
          ))}
        </List>
      )}
      {isLoading && <p>Loading...</p>}
      {!isLoading && peopleList.length < 1 && (
        <div className="flex-column-container">
          <p>No People have been added yet</p>
          <Link passHref href="/add-person">
            <a>Add Your First Person!</a>
          </Link>
        </div>
      )}
      <Fabutton />
    </Box>
  );
}

export default People;
