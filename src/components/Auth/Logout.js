import React from 'react';
import { firebase } from '../../firebase/firebase';

export default function Logout() {
  const handleLogout = () => {
    return firebase.auth().signOut();
  };

  return (
    <div className="logout-container">
      <button
        className="button button-sm button-blue"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
