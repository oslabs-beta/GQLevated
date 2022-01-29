import Head from 'next/head';
import Image from 'next/image';
import Nav from '../components/Nav';
import styles from '../styles/HomeContent.module.css';
import Hero from '../components/Hero';
import LearnFeatures from '../components/LearnFeatures';

export default function Home() {
  return (
    <>
      <div className={styles.homeContent}>
        <Head>
          <title>GQLevated</title>
          <meta property='og:title' content='GQLevated' key='title' />
        </Head>
        <Hero />
        <LearnFeatures />
      </div>
    </>
  );
}
