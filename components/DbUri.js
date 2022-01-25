import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/DbUri.module.css';

const easing = [0.83, 0, 0.17, 1];

const fadeInRight = {
  initial: {
    x: [-400, 50, 0],
    opacity: 1,
  },
  animate: {
    x: 0,
    opacity: 0,
    transition: {
      delay: 10,
      // type: 'spring',
      duration: 1.0,
      ease: easing,
    },
  },
  exit: {
    opacity: 1,
    x: [-400, 50, 0],
  },
};

const fadeInLeft = {
  initial: {
    x: [0, 50, -400],
    opacity: 1,
  },
  animate: {
    x: 0,
    opacity: 0,
    transition: {
      delay: 10,
      type: 'spring',
      duration: 1.0,
      // ease: easing,
    },
  },
};

function DbUri({ hidePanel }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div variants={fadeInRight} initial='initial' exit='exit' animate='initial' className={styles.container}>
        <div className={styles.uriString}>
          <h2>Elevated your project with seamless integration</h2>
          <br></br>
          <input className={styles.dbInput} placeholder='postgres://' />
          <br></br>
          <button className={styles.button} onClick={() => hidePanel()}>
            Submit
          </button>
        </div>
        <div className={styles.sampledb}>
          <h2>See how it works with our sample database </h2>
          <br></br>
          <button className={styles.button}>Sample Database</button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DbUri;
