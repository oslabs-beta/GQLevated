import React from 'react';
import styles from '../styles/Learn.module.css'
import Features from './Features'

function LearnFeatures() {
  const features = [
    [
      'Import your PostgreSQL database',
      'Users will be able to enter their PostgreSQL connection string into a text field or use our sample database to explore GQLevated.',
      '../assets/UISample.jpg',
    ],
    [
      'GraphQL Code',
      'Automatically generate GraphQL types, resolvers, mutations and client queries to inject into your own application.',
      '../assets/UISample.jpg',
    ],
    [
      'Export your GraphQL Code',
      'Users will have the option to either copy and paste the displayed code or export the code as individual files.',
      '../assets/UISample.jpg',
    ],
    [
      'Visualize your GraphQL Schema',
      'Users will be able to visualize and interact their database relationships.',
      '../assets/UISample.jpg',
    ],
  ];

  const introFeatures = [];
  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    introFeatures.push(
      <Features
        key={i}
        index={i}
        title={feature[0]}
        description={feature[1]}
        gif={feature[2]}
      />
    );
  }


  return( 
  <div className={styles.learn} id='learn'>
    <div className={styles.overview}>
      <br></br>
      <h1>What can GQLevated do for you?</h1>
      <br></br>
      <p>Our Hosted Web App developer tool will supply users with customized production-ready GraphQL types, resolvers, mutations and queries. Allowing developers to spend more time solving problems and less time tediously writing GraphQL code. Thus ELEVATING the project as a whole. 
      <br></br>
      <br></br>
      And free to use for everyone! No need to create an account.
      </p>
    </div>
    <div className='allFeatures'>{introFeatures}</div>   
  </div>
  );
}
export default LearnFeatures;
