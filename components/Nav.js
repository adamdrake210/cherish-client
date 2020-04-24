import React from 'react';
import Link from 'next/link';

function Nav() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/add-person">
          <a>Add Person</a>
        </Link>
      </li>
    </ul>
  );
}

export default Nav;
