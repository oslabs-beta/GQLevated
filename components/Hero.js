import React from 'react';
import styles from '../styles/Hero.module.css';
import Link from "next/link";
import Image from 'next/image';
import GQLLogo from '../public/LOGO.svg';


function Hero() {
  const HandleLearnMore = () => {

  }

  return (
    <div className={styles.hero}>
    <Image src={GQLLogo} width={300} height={300} alt="logo-gif"/>
    <h1>GQLevated</h1>
      <br></br>
      <h2>Elevate your projects with seamless GraphQL integration</h2>
      <br></br>
      <br></br>
      <Link href='/#learn'>
      <button > Learn More </button>
      </Link>
    </div>
  );
}

export default Hero;
