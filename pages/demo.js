import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DbUri from '../components/DbUri';
import CodeBoxContainer from '../components/CodeBoxContainer';
import HiddenURIPanel from '../components/HiddenURIPanel';
import styles from '../styles/Demo.module.css';

function Demo() {
  const [showURIPanel, setShowURIPanel] = useState(true);

  return (
    <div className={styles.wrapper}>
      {showURIPanel ? <DbUri hidePanel={() => setShowURIPanel(false)} /> : <HiddenURIPanel showPanel={() => setShowURIPanel(true)} />}

      <CodeBoxContainer />
    </div>
  );
}

export default Demo;
