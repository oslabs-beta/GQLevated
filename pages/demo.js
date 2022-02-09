import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Head from 'next/head';

import { setQueries, showDemo, setIsError, setErrorMsg, setShowLoader } from '../features/demoSlice';
import createNodes from '../utils/createNodes';
import DbUri from '../components/DbUri';
import Loader from '../components/Loader';
import FlowModal from '../components/flowModal';
import CodeBoxContainer from '../components/CodeBoxContainer';
import HiddenURIPanel from '../components/HiddenURIPanel';
import styles from '../styles/Demo.module.css';

function Demo() {
  const [showURIPanel, setShowURIPanel] = useState(true);

  const showLoader = useSelector((state) => state.demo.showLoader);
  const showFlowModal = useSelector((state) => state.demo.showFlowModal);
  const dispatch = useDispatch();

  //On Demo load, clear queries and demo flag
  useEffect(() => {
    return () => {
      dispatch(setQueries(''));
      dispatch(showDemo(false));
      dispatch(setIsError(false));
    };
  }, []);

  const fetchData = (uri) => {
    // fetch('http://localhost:8080/convert-mongo-db', {
    fetch('http://localhost:8080/convert-sql-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: uri }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.err) {
          dispatch(setIsError(true));
          dispatch(setErrorMsg(data.err));
        } else {
          console.log('data', data);
          // createNodes(data.SQLSchema);
          dispatch(setShowLoader(true));
          setTimeout(() => {
            dispatch(setShowLoader(false));
            dispatch(setQueries(data));
            setShowURIPanel(false);
          }, 550);
        }
      })
      .catch(async (err) => {
        console.log('err', err);
        dispatch(setShowLoader(false));
        dispatch(setErrorMsg(err));
        dispatch(setIsError(true));
      });
  };

  const createFlowNodes = () => {};

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>GQLevated</title>
        <meta property='og:title' content='GQLevated' key='title' />
      </Head>
      {showURIPanel ? (
        <DbUri fetchData={fetchData} setLoader={setShowLoader} hidePanel={() => setShowURIPanel(false)} />
      ) : (
        <HiddenURIPanel showPanel={() => setShowURIPanel(true)} />
      )}

      <CodeBoxContainer />
      {showLoader && <Loader />}
      {showFlowModal && <FlowModal />}
    </div>
  );
}

export default Demo;
