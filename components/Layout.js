import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from '../styles/Layout.module.css';
import React from 'react';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Nav className={styles.navbar} styles={styles.list} />
      <main className={styles.main}>{children}</main>
      <Footer styles={styles.list} />
    </div>
  );
}

export default Layout;
