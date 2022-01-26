import React from 'react';
import styles from '../styles/Team.module.css';
import { Container, Row, Grid, Card, Text, Divider, Link, Spacer } from '@nextui-org/react';
import Image from 'next/image';
import JC from '../public/JC.png';
import JA from '../public/JA.png';
import NG from '../public/NG.png';
import QC from '../public/QC.png';
import GitHubLogo from '../public/GitHub-Mark-Light-64px.png';
import LinkedInLogo from '../public/Linkedin-logo-on-transparent-Background-PNG-.png';

function Team() {
  return (
    <div className={styles.team} id='team'>
      <Spacer y={5} />
      <h1>Meet the Team</h1>
      <Spacer y={4} />
      <Grid.Container gap={5} justify='center'>
        <Grid justify='center'>
          <Card css={{ w: '100%', border: '$space$1 solid #a359d8' }} bordered shadow={true}>
            <Card.Header>
              <Text b size={25}>
                John Alicastro
              </Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: '$10' }}>
              <Image src={JA} />
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify='space-around'>
                <Link href='https://github.com/JohnAlicastro'>
                  <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                </Link>
                <Link href='https://www.linkedin.com/in/john-alicastro-482032187'>
                  <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                </Link>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid justify='center'>
          <Card css={{ w: '100%', border: '$space$1 solid #a359d8' }} bordered shadow={true}>
            <Card.Header>
              <Text b size={25}>
                Johnson Che
              </Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: '$10' }}>
              <Image src={JC} />
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify='space-around'>
                <Link href='https://github.com/JohnsonChe'>
                  <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                </Link>
                <Link href='https://www.linkedin.com/in/JohnsonChe/'>
                  <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                </Link>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid justify='center'>
          <Card css={{ w: '100%', border: '$space$1 solid #a359d8' }} bordered shadow={true}>
            <Card.Header>
              <Text b size={25}>
                Nicholas Gonzalez
              </Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: '$10' }}>
              <Image src={NG} />
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify='space-around'>
                <Link href='https://github.com/Nikootz'>
                  <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                </Link>
                <Link href='https://www.linkedin.com/in/nicholas-gonzalez-036b1751/'>
                  <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                </Link>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid justify='center'>
          <Card css={{ w: '100%', border: '$space$1 solid #a359d8' }} bordered shadow={true}>
            <Card.Header>
              <Text b size={25}>
                Quyen Calixto
              </Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ py: '$10' }}>
              <Image src={QC} />
            </Card.Body>
            <Divider />
            <Card.Footer>
              <Row justify='space-around'>
                <Link href='https://github.com/QtieCoder'>
                  <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                </Link>
                <Link href='https://www.linkedin.com/in/quyencalixto/'>
                  <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                </Link>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
}

export default Team;
