import Head from 'next/head';

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
