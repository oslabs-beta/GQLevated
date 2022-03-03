import Head from 'next/head';
import React from 'react';
import PreviewImage from '../public/GQLevatedWordMark.png'


import Team from '../components/Team';

function About() {
  return (
    <div>
      <Head>
        <title>GQLevated</title>
        <meta property='og:title' content='GQLevated' key='title' />
        <meta property='og:image' content={PreviewImage} key='ogimage' />
      </Head>
      <Team />
    </div>
  );
}

export default About;
