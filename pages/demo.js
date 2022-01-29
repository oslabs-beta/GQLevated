import Head from 'next/head';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DbUri from '../components/DbUri';
import Loader from '../components/Loader';
import CodeBoxContainer from '../components/CodeBoxContainer';
import HiddenURIPanel from '../components/HiddenURIPanel';
import styles from '../styles/Demo.module.css';

function Demo() {
  const [showURIPanel, setShowURIPanel] = useState(true);
  const [queryData, setQueryData] = useState();
  const [showDemo, setShowDemo] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const fetchData = (uri) => {
    fetch('http://localhost:8080/convert-sql-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: uri }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.err) {
          // setShowLoader(false);
          await delayLoader();
          setIsError(true);
          setErrorMsg(data.err);
          console.log(data.err);
        } else {
          // setShowLoader(false);
          await delayLoader();
          setQueryData(data);
          setShowURIPanel(false);
        }
      })
      .catch(async (err) => {
        await delayLoader();
        setErrorMsg(err);
        setIsError(true);
      });
  };

  const delayLoader = () => {
    setTimeout(() => {
      setShowLoader(false);
    }, 700);
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>GQLevated</title>
        <meta property='og:title' content='GQLevated' key='title' />
      </Head>
      {showURIPanel ? (
        <DbUri
          isError={isError}
          errorMsg={errorMsg}
          setIsError={setIsError}
          setShowDemo={setShowDemo}
          fetchData={fetchData}
          setLoader={setShowLoader}
          setQueryData={setQueryData}
          hidePanel={() => setShowURIPanel(false)}
        />
      ) : (
        <HiddenURIPanel showPanel={() => setShowURIPanel(true)} />
      )}

      <CodeBoxContainer data={queryData} showDemo={showDemo} />
      {showLoader && <Loader />}
    </div>
  );
}

export default Demo;
