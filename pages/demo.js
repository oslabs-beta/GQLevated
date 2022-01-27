import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DbUri from '../components/DbUri';
import CodeBoxContainer from '../components/CodeBoxContainer';
import HiddenURIPanel from '../components/HiddenURIPanel';
import styles from '../styles/Demo.module.css';

function Demo() {
  const [showURIPanel, setShowURIPanel] = useState(true);
  const [queryData, setQueryData] = useState();
  const [showDemo, setShowDemo] = useState(false);

  const fetchData = (uri) => {
    fetch('http://localhost:8080/convert-sql-db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ link: uri }),
    })
      .then((res) => res.json())
      .then((data) => setQueryData(data))
      .catch((err) => {
        setErrorMsg(err);
        setIsError(true);
      });
  };

  return (
    <div className={styles.wrapper}>
      {showURIPanel ? (
        <DbUri setShowDemo={setShowDemo} fetchData={fetchData} hidePanel={() => setShowURIPanel(false)} />
      ) : (
        <HiddenURIPanel showPanel={() => setShowURIPanel(true)} />
      )}

      <CodeBoxContainer data={queryData} showDemo={showDemo} />
    </div>
  );
}

export default Demo;
