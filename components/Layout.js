import Nav from '../components/Nav';
import Footer from './GitHubStar';
import styles from '../styles/Layout.module.css';
import React from 'react';

function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default Layout;
