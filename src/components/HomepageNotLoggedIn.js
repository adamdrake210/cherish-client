import React from 'react';
import Link from 'next/link';

export default function HomepageNotLoggedIn() {
  return (
    <div className="container homepagen-nli-container">
      <p className="cherish-logo cherish-logo-lg">Cherish</p>
      <h1>You own private online address book</h1>
      <h2>Cherish those close to you</h2>
      <div className="sign-up-links">
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
