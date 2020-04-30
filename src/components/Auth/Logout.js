import React from 'react';
import { firebase } from '../../firebase/firebase';

export default function Logout({ user }) {
  const handleLogout = () => {
    return firebase.auth().signOut();
  };

  return (
    <div className="logout-container">
      <div>{user.displayName}, </div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
