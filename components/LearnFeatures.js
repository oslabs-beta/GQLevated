import React from 'react';
import { Spacer } from '@nextui-org/react';

import styles from '../styles/Learn.module.css';
import Features from './Features';

function LearnFeatures() {
  const features = [
    [
      'Connect to your database',
      "Enter your PostgreSQL or MongoDB connection string and connect to your database. Don't have a connection string but still want to see how it works? No problem! Connect to our PostgresQL Sample Database and see GQLevated in action.",
    ],
    [
      'Generate your GraphQL Code',
      'With one simple click of a button GQLevated connects to your database, parses the data and generates the corresponding GraphQL code for you. This production-ready GraphQL code includes server-side Types, Root Queries and Mutations as well as client-side Queries and Mutations. It is displayed for you in an easy to reason about way and ready to be injected into your own application.',
    ],
    [
      'Export your GraphQL Code',
      'In addition to copying and pasting the newly generated GraphQL code straight from the browser display, users also have the option to export their customized GraphQL code as individual JavaScript files. Simply click on the ‘Export Code‘ button in the corresponding container of the code that you wish to download.',
    ],
    [
      'Visualize your GraphQL Schema', 
      'Visualize and interact with your database relationships!',
    ],
  ];

  const introFeatures = [];
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    introFeatures.push(<Features key={i} index={i} title={feature[0]} description={feature[1]} />);
  }

  return (
    <div className={styles.learn} id='learn'>
      <Spacer y={3} />
      <div className={styles.overview}>
        <br></br>
        <h1 className={styles.headers}>What can GQLevated do for you?</h1>
        <br></br>
        <p className={styles.paragraphs}>
          <div className={styles.text}>
            Our Web Development Tool supplies users with customized, production-ready GraphQL code including server-side Types, Root Queries and Mutations as
            well as client-side Queries and Mutations. This allows developers to spend more time solving problems and less time tediously writing GraphQL code,
            thus ELEVATING the project as a whole.
          </div>
          <br></br>
          <p className={styles.text}>And it’s free to use for everyone - no need to create an account!</p>
        </p>
      </div>

      <div className={styles.allFeatures}>{introFeatures}</div>
    </div>
  );
}
export default LearnFeatures;
