import Link from 'next/link';
import React from 'react';
import styles from '../styles/Nav.module.css';

function Nav() {
  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.ul}>
          <li className={styles.navitem}>
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
