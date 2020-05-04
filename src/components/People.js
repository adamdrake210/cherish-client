import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPeople } from '../firebase/firebaseapi';
import { useUserContext } from '../context/userContext';
import { sortLastName } from '../helpers/helpers';

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
    <div className="container homepage">
      <div className="homepage-search">
        <input
          type="text"
          className="homepage-search-input"
          placeholder="Search Peeps..."
          onChange={e => handleChange(e)}
        />
      </div>
      <h2>All</h2>
      {filteredList && (
        <ul className="homepage-people-list">
          {filteredList.map(person => (
            <li key={person.id}>
              <Link passHref href={`/person/${person.id}`}>
                <a>
                  <p>{`${person.firstName} ${person.lastName}`}</p>
                  <span>{person.relationshiptype}</span>
                </a>
              </Link>{' '}
              <Link passHref href={`/edit-person/${person.id}`}>
                <a>Edit</a>
              </Link>
            </li>
          ))}
        </ul>
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
    </div>
  );
}

export default People;
