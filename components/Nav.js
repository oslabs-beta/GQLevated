import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Nav.module.css';
import Footer from '../components/Footer';

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
      e.target.style.color = 'var(--primary-text)';
    }
  };

  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.ul}>
          <Link href='/'>
            <motion.li
              whileHover={{ position: 'relateve', zIndex: 1, scale: 1.2, transition: { duration: 0.2 } }}
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
            </motion.li>
          </Link>

          <Link href='/about'>
            <motion.li
              whileHover={{ position: 'relateve', zIndex: 1, scale: 1.2, transition: { duration: 0.2 } }}
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
            </motion.li>
          </Link>

          <Link href='https://github.com/oslabs-beta/GQLevated'>
            <motion.li
              whileHover={{ position: 'relateve', zIndex: 1, scale: 1.2, transition: { duration: 0.2 } }}
              className={styles.listitem}
              onMouseEnter={async (e) => {
                await setIsHover(false);
                handleHover(e);
              }}
              onMouseLeave={async (e) => {
                await setIsHover(true);
                handleHover(e);
              }}
            >
              Github
            </motion.li>
          </Link>

          <Link href='/demo'>
            <motion.li
              whileHover={{ position: 'relateve', zIndex: 1, scale: 1.2, transition: { duration: 0.2 } }}
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
            </motion.li>
          </Link>
        </ul>
      </nav>
      <Footer />
    </div>
  );
}

export default Nav;
