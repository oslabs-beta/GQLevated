import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/DbUri.module.css';
import { Input, Spacer, Button, Loading } from '@nextui-org/react';

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
          <Spacer y={1.5} />
          <Input clearable bordered width='20rem' labelPlaceholder='PostgreSQL URI' initialValue='' />
          <Spacer y={1.5} />
          <Button auto clickable={true} color='gradient' rounded='false' size='sm' css={{ px: '$14' }} onClick={() => hidePanel()}>
            Submit
          </Button>
        </div>
        <div className={styles.sampledb}>
          <h2>See how it works with our sample database </h2>
          <Spacer y={1.5} />
          <Button auto clickable={true} color='default' rounded='false' size='sm' css={{ px: '$10' }} onClick={() => hidePanel()}>
            Sample Database
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DbUri;
