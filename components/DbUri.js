import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/DbUri.module.css';
import { Input, Spacer, Button, Loading } from '@nextui-org/react';
import CryptoJS from 'crypto-js';
import secretKey from '../server/secretKey';

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

function DbUri({ hidePanel, fetchData, setShowDemo, isError, errorMsg, setIsError, setLoader, setQueryData }) {
  const uriField = useRef();

  const handleClick = (e) => {
    const URILink = uriField.current.value;
    e.preventDefault();
    if (URILink.length > 0) {
      const encryptedURL = CryptoJS.AES.encrypt(URILink, secretKey).toString();

      fetchData(encryptedURL);
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div variants={fadeInRight} initial='initial' exit='exit' animate='initial' className={styles.container}>
        <div className={styles.uriString}>
          <h2>Elevate your project with seamless GraphQL integration</h2>
          <Spacer y={1.5} />
          <Input
            clearable
            bordered
            width='20rem'
            labelPlaceholder='PostgreSQL URI'
            initialValue=''
            ref={uriField}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleClick(e);
            }}
          />
          <Spacer y={1.5} />
          {isError ? <span className={styles.error}>{errorMsg}</span> : null}
          <Spacer y={1.5} />
          <Button
            auto
            clickable={true}
            color='default'
            rounded='false'
            size='sm'
            css={{ px: '$14' }}
            onClick={(e) => {
              setLoader(true);
              setQueryData('');
              handleClick(e);
              setShowDemo(false);
              setIsError(false);
            }}
          >
            Submit
          </Button>
        </div>
        <div className={styles.sampledb}>
          <h2>See how it works with our Sample Database </h2>
          <Spacer y={1.5} />
          <Button
            auto
            clickable={true}
            color='default'
            rounded='false'
            size='sm'
            css={{ px: '$10' }}
            onClick={() => {
              hidePanel();
              setIsError(false);
              setShowDemo(false);
              setQueryData('');
              setLoader(true);
              setTimeout(() => {
                setLoader(false);
                setShowDemo(true);
              }, 700);
            }}
          >
            Sample Database
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DbUri;
