import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/GitHubStar.module.css';
import LinkedInLogo from '../public/linkedin.png';
import GitHubLogo from '../public/GitHub-Mark-Light-64px.png';
import GitHubButton from 'react-github-btn';


function GitHubStar() {
  return (
    <footer>
      <ul className={styles.ul}>
      <Link href='https://www.linkedin.com/company/gqlevated'>
        <li className={styles.listitem}>
        <Image src={LinkedInLogo} width={40} height={40} alt="logo-gif" />
        </li>
      </Link>
      <Link href='https://github.com/oslabs-beta/GQLevated'> 
        <li className={styles.listitem}>
        <Image src={GitHubLogo} width={40} height={40} alt="logo-gif" />
        </li>
      </Link>
        <li className={styles.listitem}>
          <GitHubButton
            href='https://github.com/oslabs-beta/GQLevated'
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
