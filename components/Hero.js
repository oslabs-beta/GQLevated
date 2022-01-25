import React from 'react';
import styles from '../styles/Hero.module.css';
import Link from "next/link";

function Hero() {
  const HandleLearnMore = () => {

  }

  return (
    <div className={styles.hero}>
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
