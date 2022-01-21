import Link from 'next/link';
import React from 'react';

function Nav({ className, styles }) {
  return (
    <div className={className}>
      <nav>
        <ul className={styles}>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
          <li>
            <Link href='#'>Github</Link>
          </li>
          <li>
            <Link href='/demo'>Demo</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
