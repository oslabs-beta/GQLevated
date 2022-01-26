import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/HiddenURIPanel.module.css';

const easing = [0.83, 0, 0.17, 1];

const fadeInLeft = {
  initial: {
    x: [0, 10, 0],
    opacity: 1,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 10,
      type: 'bounce',
      duration: 1.0,
      // ease: easing,
    },
  },
};

function HiddenURIPanel({ showPanel }) {
  const [showHoverPanel, setShowHoverPanel] = useState(false);
  const panelRef = useRef();

  useEffect(() => {
    if (showHoverPanel) {
      panelRef.current.style.boxShadow = '0 0 10px #cbcdd0';
      panelRef.current.style.backgroundColor = 'var(--secondary-color)';
      panelRef.current.style.opacity = '0.5';
    } else {
      console.log('panel.current', panelRef.current);
      panelRef.current.style.boxShadow = '';
      panelRef.current.style.backgroundColor = '';
    }
  }, [showHoverPanel]);

  const bounceTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeOut',
  };

  return (
    <motion.div
      variants={fadeInLeft}
      animate='initial'
      whileHover={{ transition: bounceTransition, animate: { x: ['100%', '-100%'] } }}
      className={styles.panel}
      ref={panelRef}
      onClick={() => showPanel()}
      onMouseOver={() => setShowHoverPanel(true)}
      onMouseLeave={() => setShowHoverPanel(false)}
    ></motion.div>
  );
}

export default HiddenURIPanel;
