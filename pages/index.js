import Head from 'next/head';
import Image from 'next/image';
import Nav from '../components/Nav';
import styles from '../styles/HomeContent.module.css';
import Hero from '../components/Hero';
import LearnFeatures from '../components/LearnFeatures'
import Team from '../components/Team'

export default function Home() {
  return (
    <>
      <div className={styles.homeContent}>
        <Hero />
        <LearnFeatures/>
      </div>
    </>
  );
}
