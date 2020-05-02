import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { firestore } from '../firebase/firebase';
import { getPeople } from '../firebase/firebaseapi';
import { useUserContext } from '../context/userContext';

function People() {
  // const [user, setUser] = useState();
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
      })
      .catch(err => {
        console.log(err);
      });

  const getUser = async () =>
    firestore
      .collection('users')
      .where('email', '==', 'adamgedrake@gmail.com')
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
          // setUser({ ...doc.data(), id: doc.id });
          handleGetPeople(doc.id);
        });
      })
      .catch(err => {
        console.log(err);
      });

  useEffect(() => {
    getUser();
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
    </div>
  );
}

export default People;
