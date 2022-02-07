import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GQLevatedLogo from '../public/GQL_ASSET.svg';
import styles from '../styles/Nav.module.css';

function GQLevated() {
  return (
    <div className={styles.gql}>
      <Link href='/'> 
      <Image src={GQLevatedLogo} width={300} height={90} alt='logo-gif' />
      </Link>
    </div>
  );
}

export default GQLevated;
