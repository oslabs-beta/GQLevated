import React from 'react';
import styles from '../styles/DbUri.module.css';


function DbUri() {
  return (
  <div className={styles.container}>
    <div className={styles.sampledb}>
        <h2>Elevated your project with seamless integration</h2>
        <br></br>
        <input className={styles.dbInput} placeholder="postgres://" />
        <br></br>
          <button className={styles.button} >
            Submit
          </button>
          </div>
          <div className={styles.uriString}>
          <h2>See how it works with our sample database </h2>
          <br></br>
          <button className={styles.button} >
          Sample Database
        </button>


    </div>
  </div>
  );
}

export default DbUri;
