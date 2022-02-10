import React from 'react';

import Nav from '../components/Nav';
import styles from '../styles/Layout.module.css';

function Layout({ children }) {
  return (
    <>
      <Nav />
      <main className={styles.main}>{children}</main>
    </>
  );
}

export default Layout;
