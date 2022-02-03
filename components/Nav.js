import Link from 'next/link';
import React from 'react';
import styles from '../styles/Nav.module.css';
import GitHubStar from './GitHubStar';
import GQLevated from './GQLevated.js';

function Nav() {
  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.ul}>
          <Link href='/'>
            <li className='hover list-item'>Home</li>
          </Link>

          <Link href='/about'>
            <li className='hover list-item'>About</li>
          </Link>

          <Link href='/demo'>
            <li className='hover list-item'>Demo</li>
          </Link>
        </ul>
      </nav>
      {/* LOGO */}
      <GQLevated />
      <GitHubStar />
    </div>
  );
}

export default Nav;
