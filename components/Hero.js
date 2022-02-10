import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Spacer } from '@nextui-org/react';

import styles from '../styles/Hero.module.css';
import GQLLogo from '../public/LOGO.svg';

const easing = [0.17, 0.67, 0.84, 0.66];

const rotate = {
  initial: {
    rotate: [0, 750, 720],
    transition: {
      linear: easing,
      duration: 2.2,
    },
  },
};

function Hero() {
  return (
    <div className={styles.hero}>
      <motion.div variants={rotate} animate='initial'>
        <Image src={GQLLogo} width={300} height={300} alt='logo-gif' />
      </motion.div>
      <Spacer y={4} />
      <h1>GQLevated</h1>
      <Spacer y={0.5} />
      <h2>Elevate your projects with seamless GraphQL integration</h2>

      <Link href='/#learn'>
        <button className='hvr-wobble-vertical'> Learn More </button>
      </Link>
    </div>
  );
}

export default Hero;
