import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Nav.module.css';
import GitHubStar from './GitHubStar';
import GQLevated from './GQLevated.js';

function Nav() {
  const [isHover, setIsHover] = useState(false);
  const router = useRouter();

  const handleHover = (e) => {
    if (isHover) {
      e.target.style.borderBottom = '5px solid var(--secondary-color)';
      e.target.style.backgroundColor = '#fff';
      e.target.style.color = 'Black';
    } else {
      e.target.style.borderBottom = '';
      e.target.style.backgroundColor = 'var(--primary-color)';
      e.target.style.color = 'var(--dark-text)';
    }
  };

  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.ul}>
          <Link href='/'>
            <li
              // whileHover={{ position: 'relateve', zIndex: 1, scale: 1.2, transition: { duration: 0.2 } }}
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
              // whileHover={{ position: 'relateve', zIndex: 1, scale: 1.2, transition: { duration: 0.2 } }}
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
              // whileHover={{ position: 'relateve', zIndex: 1, scale: 1.2, transition: { duration: 0.2 } }}
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
      <GQLevated />
      <GitHubStar />
    </div>
  );
}

export default Nav;
