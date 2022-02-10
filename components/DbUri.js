import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Spacer, Button } from '@nextui-org/react';
import CryptoJS from 'crypto-js';

import styles from '../styles/DbUri.module.css';
import { setQueries, showDemo, setIsError, setErrorMsg, setShowLoader, setShowFlowModal } from '../features/demoSlice';
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

function DbUri({ hidePanel, fetchData }) {
  const uriField = useRef();
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.demo.isError);
  const errorMsg = useSelector((state) => state.demo.errorMsg);

  const handleClick = async (e) => {
    const URILink = uriField.current.value;
    e.preventDefault();

    const fetchEndpoint = await checkEndpoint(URILink);
    if (URILink.length > 0 && fetchEndpoint.length > 0) {
      const encryptedURL = CryptoJS.AES.encrypt(URILink, secretKey).toString(); //Encrypting user-inputted DB URI string
      fetchData(encryptedURL, fetchEndpoint);
    } else {
      dispatch(setErrorMsg('Please enter a valid PostgreSQL or MongoDB URI'));
      dispatch(setIsError(true));
    }
  };

  const checkEndpoint = async (URILink) => {
    const mongodbURI = 'convert-mongo-db';
    const sqlURI = 'convert-sql-db';

    if (URILink.includes('postgres://')) {
      return sqlURI;
    } else if (URILink.includes('mongodb+srv://')) {
      return mongodbURI;
    } else {
      return '';
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
            labelPlaceholder='PostgreSQL or MongoDB URI'
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
              dispatch(setQueries(''));
              dispatch(showDemo(false));
              dispatch(setIsError(false));
              dispatch(setErrorMsg(''));
              handleClick(e);
            }}
          >
            Submit
          </Button>
        </div>

        <Button onClick={() => dispatch(setShowFlowModal(true))}>Visualize Schema</Button>

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
              dispatch(setIsError(false));
              dispatch(showDemo(false)); //update showDemo state in redux
              dispatch(setQueries(''));
              dispatch(setShowLoader(true));
              setTimeout(() => {
                dispatch(setShowLoader(false));
                dispatch(showDemo(true)); //update showDemo state in redux
                hidePanel();
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
