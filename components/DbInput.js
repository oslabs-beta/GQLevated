import React, { useRef } from 'react';
import { Input, Spacer, Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';

import { setQueries, showDemo, setIsError, setErrorMsg, setShowLoader, setShowDBInfo } from '../features/demoSlice';
import styles from '../styles/DbUri.module.css';
import secretKey from '../pages/api/secretKey';

function DbInput({ fetchData }) {
  const uriField = useRef();
  const isError = useSelector((state) => state.demo.isError);
  const errorMsg = useSelector((state) => state.demo.errorMsg);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    dispatch(showDemo(false));
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
    <>
      <div className={styles.uriString}>
        <h2>Generate your GraphQL code</h2>
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
            dispatch(setIsError(false));
            dispatch(setErrorMsg(''));
            handleClick(e);
          }}
        >
          Generate
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
            dispatch(setIsError(false));
            dispatch(showDemo(false)); //update showDemo state in redux
            dispatch(setQueries(''));
            dispatch(setShowLoader(true));
            setTimeout(() => {
              dispatch(setShowLoader(false));
              dispatch(showDemo(true)); //update showDemo state in redux
              dispatch(setShowDBInfo(true));
            }, 700);
          }}
        >
          Sample Database
        </Button>
      </div>
    </>
  );
}

export default DbInput;
