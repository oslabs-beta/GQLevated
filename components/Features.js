import React from 'react';
import Image from 'next/image';
import styles from '../styles/Learn.module.css'
import DbInput from '../public/UISample.jpg'
import GQLCode from '../public/UISample.jpg';
import ExportCode from '../public/UISample.jpg';
import Visualize from '../public/UISample.jpg';


function Features({index, title, description, gif}) {
    if (index === 0) {
        return (
          <div className={styles.features}>
            <div className={styles.featureWords}>
                <h1 className={styles.featureTitle}>{title}</h1>
                <br></br>
                <p className={styles.featureDescription}>{description}</p>
            </div>
            <div className={styles.imgContainer}>
                <Image className={styles.demoImg} src={DbInput} alt="demo-gif" />
            </div>
          </div>
        );
      }
      if (index === 1) {
        return (
          <div className={styles.features}>
            <div className={styles.featureWords}>
                <h1 className={styles.featureTitle}>{title}</h1>
                <br></br>
                <p className={styles.featureDescription}>{description}</p>
            </div>
            <div className={styles.imgContainer}>
                <Image className={styles.demoImg} src={GQLCode} alt="demo-gif"/>
            </div>
          </div>
        );
      }
      if (index === 2) {
        return (
          <div className={styles.features}>
            <div className={styles.featureWords}>
                <h1 className={styles.featureTitle}>{title}</h1>
                <br></br>
                <p className={styles.featureDescription}>{description}</p>
            </div>
            <div className={styles.imgContainer}>
                <Image className={styles.demoImg} src={ExportCode} alt="demo-gif"/>
            </div>
          </div>
        );
      }
      if (index === 3) {
        return (
          <div className={styles.features}>
            <div className={styles.featureWords}>
                <h1 className={styles.featureTitle}>{title}</h1>
                <br></br>
                <p className={styles.featureDescription}>{description}</p>
            </div>
            <div className={styles.imgContainer}>
                <Image className={styles.demoImg} src={Visualize} alt="demo-gif"/>
            </div>
          </div>
        );
      }
}

export default Features;
