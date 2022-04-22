import React from 'react';
import { auth } from '@/services/firebase/firebase';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();
  const handleLogout = () => {
    auth.signOut();
    router.push('/');
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
