import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { firestore } from '../firebase/firebase';

function People() {
  const [user, setUser] = useState();
  const [people, setPeople] = useState([]);

  const getPeople = async id =>
    firestore
      .collection('people')
      .where('userId', '==', id)
      .get()
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
          setUser({ ...doc.data(), id: doc.id });
          getPeople(doc.id);
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
      {user && <p>{`${user.firstName} ${user.lastName}`}</p>}
      <h2>All</h2>
      {people && (
        <ul>
          {people.map(peep => (
            <li key={peep.id}>
              {`${peep.data().firstName} ${peep.data().lastName}`}{' '}
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
