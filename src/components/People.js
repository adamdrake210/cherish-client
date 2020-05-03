import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPeople } from '../firebase/firebaseapi';
import { useUserContext } from '../context/userContext';

function People() {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const { user } = useUserContext();

  function handleSnapshot(snapshot) {
    const peopleArray = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setPeople(peopleArray);
    setIsLoading(false);
  }

  useEffect(() => {
    getPeople(user.uid, handleSnapshot);
  }, []);

  return (
    <div>
      <h1>Current User</h1>
      <p>Welcome {user && `${user.displayName}!`}</p>
      <h2>All</h2>
      {people && (
        <ul>
          {people.map(person => (
            <li key={person.id}>
              <Link passHref href={`/person/${person.id}`}>
                <a>{`${person.firstName} ${person.lastName}`}</a>
              </Link>{' '}
              <Link passHref href={`/edit-person/${person.id}`}>
                <a>Edit Person</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {isLoading && <p>Loading...</p>}
      {!isLoading && people.length < 1 && (
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
