import React from 'react';
import People from '../../components/People';
import Login from '../../components/Auth/Login';
import { useUserContext } from '../../context/userContext';

export default function Homepage() {
  const { user } = useUserContext();

  return (
    <div className="container">
      <div>
        <h1>Cherish</h1>
        {user ? <People /> : <Login />}
      </div>
    </div>
  );
}
