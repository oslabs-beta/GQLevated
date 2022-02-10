import Head from 'next/head';
import React from 'react';

import Team from '../components/Team';

function About() {
  return (
    <div>
      <Head>
        <title>GQLevated</title>
        <meta property='og:title' content='GQLevated' key='title' />
      </Head>
      <Team />
    </div>
  );
}

export default About;
