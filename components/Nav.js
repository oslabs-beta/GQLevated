import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Nav.module.css';
import GitHubLogo from '../public/GitHub-Mark-Light-64px.png';
import LinkedInLogo from '../public/linkedin.png';
import GitHubStar from './GitHubStar';


function Nav() {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  // useEffect(
  //   (e) => {
  //     if (isHover) {
  //       e.target.style.borderBottom = '3px solid var(--secondary-color)';
  //     } else {
  //       e.target.style.borderBottom = null;
  //     }
  //   },
  //   [isHover]
  // );

  const handleHover = (e) => {
    if (isHover) {
      e.target.style.borderBottom = '3px solid var(--secondary-color)';
      e.target.style.backgroundColor = '#C5D2DE';
      e.target.style.color = 'Black';
    } else {
      e.target.style.borderBottom = '';
      e.target.style.backgroundColor = 'var(--primary-color)';
      e.target.style.color = 'var(--primary-text)';
    }
  };

  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.ul}>
          <Link href='/'>
            <li
              className={router.pathname == '/' ? styles.current : styles.listitem}
              onMouseEnter={async (e) => {
                await setIsHover(false);
                handleHover(e);
              }}
              onMouseLeave={async (e) => {
                await setIsHover(true);
                handleHover(e);
              }}
            >
              Home
            </li>
          </Link>

          <Link href='/about'>
            <li
              className={router.pathname == '/about' ? styles.current : styles.listitem}
              onMouseEnter={async (e) => {
                await setIsHover(false);
                handleHover(e);
              }}
              onMouseLeave={async (e) => {
                await setIsHover(true);
                handleHover(e);
              }}
            >
              About
            </li>
          </Link>

          <Link href='/demo'>
            <li
              className={router.pathname == '/demo' ? styles.current : styles.listitem}
              onMouseEnter={async (e) => {
                await setIsHover(false);
                handleHover(e);
              }}
              onMouseLeave={async (e) => {
                await setIsHover(true);
                handleHover(e);
              }}
            >
              Demo
            </li>
          </Link>
        </ul>
      </nav>
      <GitHubStar />
    </div>
  );
}

export default Nav;
