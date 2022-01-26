import React from 'react';
import styles from '../styles/CodeBoxContainer.module.css';

function CodeBoxContainer() {
  return (
    <div className={styles.codebox}>
      <div className={styles.gqldata}>
        <h3> GraphQL Types, Root Queries, & Mutations </h3>
      </div>
      <div className={styles.client}>
        <h3> Client Queries & Mutations</h3>
      </div>
    </div>
  );
}

export default CodeBoxContainer;
