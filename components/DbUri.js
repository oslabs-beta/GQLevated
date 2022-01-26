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

function DbUri({ hidePanel }) {
  const uriField = useRef();
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const handleClick = (e) => {
    const URILink = uriField.current.value;
    e.preventDefault();
    if (URILink.length > 0) {
      const encryptedURL = CryptoJS.AES.encrypt(URILink, secretKey).toString();

      fetch('http://localhost:8080/convert-sql-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: encryptedURL }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.err) {
            setIsError(true);
            setErrorMsg(data.err);
            console.log(errorMsg);
          } else {

          }
        })
        .catch((err) => {
          setIsError(true);
          setErrorMsg(err);
        });
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div variants={fadeInRight} initial='initial' exit='exit' animate='initial' className={styles.container}>
        <div className={styles.uriString}>
          <h2>Elevate your project with seamless integration</h2>
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
          {isError ? <span className={styles.error}>{errorMsg}</span>: null}
          <Spacer y={1.5} />
          <Button auto clickable={true} color='gradient' rounded='false' size='sm' css={{ px: '$14' }} onClick={(e) => handleClick(e)}>
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
