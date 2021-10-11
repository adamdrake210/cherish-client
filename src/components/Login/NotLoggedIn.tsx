import React from 'react';
import Link from 'next/link';
import { ROUTE } from '@/routes/routeConstants';

export default function NotLoggedIn() {
  return (
    <div className="container homepagen-nli-container">
      <p className="cherish-logo cherish-logo-lg">Cherish</p>
      <h1>Your own private online address book</h1>
      <h2>Cherish those close to you</h2>
      <div className="sign-up-links">
        <Link href={ROUTE.REGISTER}>
          <a>Sign Up</a>
        </Link>
        /
        <Link href={ROUTE.LOGIN}>
          <a>Login</a>
        </Link>
      </div>
    </div>
  );
}
