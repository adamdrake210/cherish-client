/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import Link from 'next/link';
import { useUserContext } from '../context/userContext';
import Logout from './Auth/Logout';
import UserAvatar from './UserAvatar';

function Nav() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const { user } = useUserContext();

  return (
    <div className="navigation-container">
      <nav className="navigation-list-container">
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
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)}
        >
          <svg width="30" height="30">
            <path d="M0,5 30,5" stroke="#ff7474" strokeWidth="5" />
            <path d="M0,14 30,14" stroke="#ff7474" strokeWidth="5" />
            <path d="M0,23 30,23" stroke="#ff7474" strokeWidth="5" />
          </svg>
        </button>
      </nav>
      <nav className={`mobile-sidemenu-container ${isShowMenu ? 'show' : ''}`}>
        <ul className="mobile-sidemenu-navigation-links">
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)}
          >
            &times;
          </button>
          <li>{user ? <UserAvatar displayName={user.displayName} /> : ''}</li>
          {user && (
            <>
              <li>
                <Link href="/add-person">
                  <a
                    onClick={() =>
                      setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)
                    }
                    onKeyPress={() =>
                      setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)
                    }
                    role="button"
                    tabIndex={0}
                  >
                    Add Person
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/calendar">
                  <a
                    onClick={() =>
                      setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)
                    }
                    onKeyPress={() =>
                      setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)
                    }
                    role="button"
                    tabIndex={0}
                  >
                    Calendar
                  </a>
                </Link>
              </li>
            </>
          )}
          {!user && (
            <li>
              <Link href="/register">
                <a
                  onClick={() =>
                    setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)
                  }
                  onKeyPress={() =>
                    setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)
                  }
                  role="button"
                  tabIndex={0}
                >
                  Register
                </a>
              </Link>
            </li>
          )}
          <li>
            {user ? (
              <Logout />
            ) : (
              <Link href="/login">
                <a
                  onClick={() =>
                    setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)
                  }
                  onKeyPress={() =>
                    setIsShowMenu(prevIsShowMenu => !prevIsShowMenu)
                  }
                  role="button"
                  tabIndex={0}
                >
                  Login
                </a>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
