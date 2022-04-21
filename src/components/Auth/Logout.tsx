import React from 'react';
import { auth } from '@/services/firebase/firebase';

export default function Logout() {
  const handleLogout = () => {
    return auth.signOut();
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
