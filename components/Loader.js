import React from 'react';
import { motion } from 'framer-motion';
import GQLLogo from '../public/LOGO.svg';
import Image from 'next/image';

const easing = [0.17, 0.67, 0.84, 0.66];

const rotate = {
  initial: {
    rotate: [0, 750, 720],
    transition: {
      linear: easing,
      duration: 0.7,
    },
  },
};

function Loader() {
  return (
    <div className='modal-overlay'>
      <motion.div className='modal' variants={rotate} animate='initial'>
        <Image src={GQLLogo} width={300} height={300} alt='logo-gif' />
      </motion.div>
    </div>
  );
}

export default Loader;
