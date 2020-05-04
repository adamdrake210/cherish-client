import React from 'react';
import Link from 'next/link';

export default function HomepageNotLoggedIn() {
  return (
    <div className="container">
      <h1>You own private online address book</h1>
      <h2>Cherish those close to you</h2>
      <div>
        <Link href="/register">
          <a>Sign Up</a>
        </Link>
        /
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>
    </div>
  );
}
