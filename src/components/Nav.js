import React from 'react';
import Link from 'next/link';
import { useUserContext } from '../context/userContext';
import Logout from './Auth/Logout';

function Nav() {
  const { user } = useUserContext();

  return (
    <div className="navigation-container">
      <Link href="/">
        <a className="cherish-logo">Cherish</a>
      </Link>
      <ul className="navigation-links">
        {user && (
          <li>
            <Link href="/add-person">
              <a>Add Person</a>
            </Link>
          </li>
        )}
        {!user && (
          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
        )}
        <li>
          {user ? (
            <Logout />
          ) : (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </li>
        <li>{user ? user.displayName : ''}</li>
      </ul>
    </div>
  );
}

export default Nav;
