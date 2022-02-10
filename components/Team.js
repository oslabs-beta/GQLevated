import React from 'react';
import { Container, Row, Grid, Card, Text, Divider, Link, Spacer } from '@nextui-org/react';
import Image from 'next/image';

import styles from '../styles/Team.module.css';
import JC from '../public/JC.png';
import JA from '../public/JA.png';
import NG from '../public/NG.png';
import QC from '../public/QC.png';
import GitHubLogo from '../public/GitHub-Mark-Light-64px.png';
import LinkedInLogo from '../public/Linkedin-logo-on-transparent-Background-PNG-.png';

function Team() {
  const list = [
    {
      name: 'John Alicastro',
      img: JA,
      gitlink: 'https://github.com/JohnAlicastro',
      linkedin: 'https://www.linkedin.com/in/johnalicastro',
      bios: 'John Alicastro is a full-stack JavaScript engineer specializing in React and Express with a focus in front-end performance optimization and server-side data transfer protocols. Additional concentrations in tech include testing, auth and SQL. His interest in the inner workings of GraphQL made GQLevated a perfect fit. Prior to GQLevated, John worked as a songwriter and producer in New York City, best known for his work with WWE Music Group.',
    },
    {
      name: 'Johnson Che',
      img: JC,
      gitlink: 'https://github.com/JohnsonChe',
      linkedin: 'https://www.linkedin.com/in/JohnsonChe/',
      bios: 'Johnson Che is a full-stack software engineer with experience in React, Node.js, Express, with a passion for frontend development. When he isn\t coding, he enjoys hiking, indoor bouldering, and keeping up with the latest tech.',
    },
    {
      name: 'Nicholas Gonzalez',
      img: NG,
      gitlink: 'https://github.com/Nikootz',
      linkedin: 'https://www.linkedin.com/in/nicholas-gonzalez-036b1751/',
      bios: 'Nicholas Gonzalez is a full-stack software engineer from Queens, NY with experience in React, Node.js, and Express, with a passion for problem solving and recursive algorithms. His love for creating and cultivating collaborative work environments made him a perfect fit for GQLevated. When not coding, Nick enjoys making and appreciating music or pushing his personal limits through focused learning and physical fitness.',
    },
    {
      name: 'Quyen Calixto',
      img: QC,
      gitlink: 'https://github.com/QtieCoder',
      linkedin: 'https://www.linkedin.com/in/quyencalixto',
      bios: 'Quyen is a full-stack software engineer from Brooklyn, NY, with experience in React and Express. She is passionate about solving complex problems and working in teams as well as learning new technologies. In her previous life, Quyen was an Internal Auditor with a passion for IT. In her spare time, when she’s not catching up on HK dramas, she enjoys dining at Michelin restaurants and chasing the latest foodie trends. ',
    },
  ];

  return (
    <div className={styles.team} id='team'>
      <Spacer y={1} />
      <h1>Meet the Team</h1>
      <Spacer y={1} />
      <Grid.Container css={{ w: '75%' }} gap={2} justify='space-around'>
        {list.map((item, index) => (
          <Grid gap={5} xs={12} sm={6} key={index} css={{ border: '$space$1 solid white' }}>
            <Card css={{ w: '35%', borderRadius: '0' }}>
              <Card.Header>
                <Text b size={20}>
                  {item.name}
                </Text>
              </Card.Header>
              <Divider />
              <Card.Body css={{ py: '$10' }}>
                <Image layout='responsive' src={item.img} alt='logo-gif' />
              </Card.Body>
              <Card.Footer>
                <Row justify='center'>
                  <a href={item.gitlink} target='_blank' rel='noreferrer noopener'>
                    <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                  </a>
                  <a href={item.linkedin} target='_blank' rel='noreferrer noopener'>
                    <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                  </a>
                </Row>
              </Card.Footer>
            </Card>
            <Card css={{ w: '65%', borderRadius: '0' }}>
              <Spacer y={2.6} />

              <Card.Body css={{ py: '$10' }}>
                <Text>{item.bios}</Text>
              </Card.Body>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </div>
  );
}

export default Team;
