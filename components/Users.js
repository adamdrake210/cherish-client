import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase/firebase';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firestore
      .collection('users')
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(querySnapshot.docs);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>All Current Users</h1>
      {users && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {`${user.data().firstName} ${user.data().lastName}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
