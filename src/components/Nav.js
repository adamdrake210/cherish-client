import React from 'react';
import Link from 'next/link';
import { useUserContext } from '../context/userContext';
import Logout from './Auth/Logout';

function Nav() {
  const { user } = useUserContext();

  return (
    <div className="navigation-container">
      <span className="cherish-logo">Cherish</span>
      <ul className="navigation-links">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
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
            <Logout user={user} />
          ) : (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Nav;
