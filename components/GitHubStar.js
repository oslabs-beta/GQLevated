import React from 'react';
import Image from 'next/image';

import styles from '../styles/GitHubStar.module.css';
import LinkedInLogo from '../public/Linkedin-logo-on-transparent-Background-PNG-.png';
import GitHubLogo from '../public/GitHub-Mark-64px.png';
import GitHubButton from 'react-github-btn';
import GraphqlLogo from '../public/graphql2.png';
import MediumLogo from '../public/medium-monogram-480.png';

function GitHubStar() {
  return (
    <footer>
      <ul className={styles.ul}>
        <a href='https://graphql.org/' target='_blank' rel='noreferrer noopener'>
          <li className={styles.listgqllogo}>
            <Image src={GraphqlLogo} width={50} height={50} alt='logo-gif' />
          </li>
        </a>
        <a href='https://medium/' target='_blank' rel='noreferrer noopener'>
          <li className={styles.listitem}>
            <Image src={MediumLogo} width={45} height={45} alt='logo-gif' />
          </li>
        </a>
        <a href='https://www.linkedin.com/company/gqlevated' target='_blank' rel='noreferrer noopener'>
          <li className={styles.listitem}>
            <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
          </li>
        </a>
        <a href='https://github.com/oslabs-beta/GQLevated' target='_blank' rel='noreferrer noopener'>
          <li className={styles.listitem}>
            <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
          </li>
        </a>
        <li className={styles.listitem}>
          <GitHubButton
            href='https://github.com/oslabs-beta/GQLevated'
            target='_blank'
            data-icon='octicon-star'
            data-size='large'
            data-show-count='true'
            aria-label='Star oslabs-beta/GQLevated on GitHub'
          >
            Star
          </GitHubButton>
        </li>
      </ul>
    </footer>
  );
}

export default GitHubStar;
