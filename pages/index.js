import Head from 'next/head';
import PreviewImage from '../public/GQLevatedWordMark.png'
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
          <meta property='og:image' content={PreviewImage} key='ogimage' />
        </Head>
        <Hero />
        <LearnFeatures />
      </div>
    </>
  );
}
