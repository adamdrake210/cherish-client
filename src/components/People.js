import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPeople } from '../firebase/firebaseapi';
import { useUserContext } from '../context/userContext';

function People() {
  const [loading, setLoading] = useState(true);
  const [people, setPeople] = useState([]);
  const { user } = useUserContext();

  const handleGetPeople = async id =>
    getPeople(id)
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPeople(querySnapshot.docs);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });

  useEffect(() => {
    handleGetPeople(user.uid);
  }, []);

  return (
    <div>
      <h1>Current User</h1>
      <p>Welcome {user && `${user.displayName}!`}</p>
      <h2>All</h2>
      {people && (
        <ul>
          {people.map(peep => (
            <li key={peep.id}>
              <Link passHref href={`/person/${peep.id}`}>
                {`${peep.data().firstName} ${peep.data().lastName}`}
              </Link>{' '}
              <Link passHref href={`/edit-person/${peep.id}`}>
                Edit Person
              </Link>
            </li>
          ))}
        </ul>
      )}
      {loading && <p>Loading...</p>}
      {!loading && people.length < 1 && (
        <div className="flex-column-container">
          <p>No People have been added yet</p>
          <Link passHref href="/add-person">
            Add Your First Person!
          </Link>
        </div>
      )}
    </div>
  );
}

export default People;
