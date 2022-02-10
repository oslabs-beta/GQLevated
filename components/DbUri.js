import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, Spacer, Button } from '@nextui-org/react';

import DbInput from '../components/DbInput';
import DbInfo from '../components/DbInfo';
import styles from '../styles/DbUri.module.css';
import { SQLSchema } from '../server/sampleDB';
import { setQueries, showDemo, setIsError, setErrorMsg, setShowLoader, setShowFlowModal } from '../features/demoSlice';
import secretKey from '../server/secretKey';
import { useEffect } from 'react';

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

function DbUri({ hidePanel, fetchData, dbData, setDbData }) {
  const showDBInfo = useSelector((state) => state.demo.showDBInfo);
  const showDemo = useSelector((state) => state.demo.showDemo);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div variants={fadeInRight} initial='initial' exit='exit' animate='initial' className={styles.container}>
        {showDBInfo ? <DbInfo dbData={dbData} hidePanel={hidePanel} setDbData={setDbData} /> : <DbInput fetchData={fetchData} />}
      </motion.div>
    </AnimatePresence>
  );
}

export default DbUri;
