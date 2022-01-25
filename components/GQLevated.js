import React from 'react';
import Image from 'next/image';
import GQLevatedLogo from '../public/GQL_ASSET.svg';
import styles from '../styles/GitHubStar.module.css';

function GQLevated() {
  return(  
    <div>

        <Image src={GQLevatedLogo} width={500} height={90} alt="logo-gif" />

    </div>    
    );
}

export default GQLevated;
