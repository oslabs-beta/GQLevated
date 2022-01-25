import React from 'react';
import GitHubButton from 'react-github-btn';

function Footer({ styles }) {
  return (
    <footer>
      <ul>
        <li className={styles}>
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

export default Footer;
