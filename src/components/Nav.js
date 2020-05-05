import React from 'react';
import Link from 'next/link';
import { useUserContext } from '../context/userContext';
import Logout from './Auth/Logout';
import UserAvatar from './UserAvatar';

function Nav() {
  const { user } = useUserContext();

  return (
    <div className="navigation-container">
      <div className="navigation-list-container">
        <Link href="/">
          <a className="cherish-logo cherish-logo-nav">Cherish</a>
        </Link>
        <ul className="navigation-links">
          {user && (
            <>
              <li>
                <Link href="/add-person">
                  <a>Add Person</a>
                </Link>
              </li>
              <li>
                <Link href="/calendar">
                  <a>Calendar</a>
                </Link>
              </li>
            </>
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
          <li>{user ? <UserAvatar displayName={user.displayName} /> : ''}</li>
        </ul>
      </div>
    </div>
  );
}

export default Nav;
