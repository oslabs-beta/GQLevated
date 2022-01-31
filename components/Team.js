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
      <Spacer y={1} />
      <h1>Meet the Team</h1>
      <Spacer y={.5} />
      <Grid.Container css={{ w:'100%'}} gap={5} justify='center' >
        <Grid xs={6} justify='space-around' >
          <Grid xs={12} css={{ w: '100%', border: '$space$1 solid white' }}>
            <Card css={{ w: '35%', borderRadius: '0',  }}>
                <Card.Header>
                  <Text b size={20}>
                  John Alicastro
                  </Text>
                </Card.Header>
                <Divider />
                <Card.Body css={{ py: '$10' }}>
                  <Image layout='responsive' src={JA} width={900} height={900} alt='logo-gif'/>
                </Card.Body>
                <Card.Footer>
                  <Row justify='space-around'>
                    <a href='https://github.com/JohnAlicastro' target='_blank' rel='noreferrer noopener'>
                      <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                    </a>
                    <a href='https://www.linkedin.com/in/johnalicastro' target='_blank' rel='noreferrer noopener'>
                      <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                    </a>
                  </Row>
                </Card.Footer>
            </Card>
            <Card css={{ w: '65%', borderRadius: '0' }}>
                <Spacer y={2.6}/>
              
                <Card.Body css={{ py: '$10' }}>
                  <Text>
                  John Alicastro is a full-stack JavaScript engineer specializing in React and Express with a focus in front-end performance optimization and server-side data transfer protocols. Additional concentrations in tech include testing, auth and SQL. His interest in the inner workings of GraphQL made GQLevated a perfect fit. Prior to GQLevated, John worked as a songwriter and producer in New York City, best known for his work with WWE Music Group. 
                  </Text>
                </Card.Body>
              </Card>
          </Grid>
        </Grid>
        <Grid xs={6} justify='space-around' >
          <Grid xs={12} css={{ w: '100%', border: '$space$1 solid white' }}>
            <Card css={{ w: '35%', borderRadius: '0',  }}>
              <Card.Header>
              <Text b size={20}>
              Johnson Che
              </Text>
              </Card.Header>
              <Divider />
              <Card.Body css={{ py: '$10' }}>
              <Image layout='responsive' src={JC} width={800} height={800} alt='logo-gif'/>
              </Card.Body>
              <Card.Footer>
                <Row justify='space-around'>
                  <a href='https://github.com/JohnsonChe' target='_blank' rel='noreferrer noopener'>
                    <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                  </a>
                  <a href='https://www.linkedin.com/in/JohnsonChe/' target='_blank' rel='noreferrer noopener'>
                    <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                  </a>
                </Row>
              </Card.Footer>
            </Card>
              <Card css={{ w: '65%', borderRadius: '0' }}>
              <Spacer y={2.6} />
            
              <Card.Body css={{ py: '$10' }}>
                <Text>
                  About me
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        </Grid>
        <Grid xs={6} justify='space-around' >
          <Grid xs={12} css={{ w: '100%', border: '$space$1 solid white' }}>
            <Card css={{ w: '35%', borderRadius: '0',  }}>
              <Card.Header>
              <Text b size={20} >
              Nicholas Gonzalez
              </Text>
              </Card.Header>
              <Divider />
                <Card.Body css={{ py: '$10' }}>
                <Image layout='responsive' src={NG} width={'800'} height={'800'} alt='logo-gif'/>
                </Card.Body>
                <Card.Footer>
                <Row justify='space-around'>
                <a href='https://github.com/Nikootz' target='_blank' rel='noreferrer noopener'>
                  <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                </a>
                <a href='https://www.linkedin.com/in/nicholas-gonzalez-036b1751/' target='_blank' rel='noreferrer noopener'>
                  <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                </a>
                </Row>
                </Card.Footer>
              </Card>
              <Card css={{ w: '65%', borderRadius: '0' }}>
              <Spacer y={2.6} />
            
              <Card.Body css={{ py: '$10' }}>
              <Text>
              About me
            </Text>
              </Card.Body>

            </Card>
            </Grid>
            </Grid>
            <Grid xs={6} justify='space-around' >
            <Grid xs={12} css={{ w: '100%', border: '$space$1 solid white' }}>
            <Card css={{ w: '35%', borderRadius: '0',  }}>
            <Card.Header>
            <Text b size={20}>
            Quyen Calixto
            </Text>
            </Card.Header>
            <Divider />
              <Card.Body css={{ py: '$10' }}>
              <Image layout='responsive' src={QC} width={'800'} height={'800'} alt='logo-gif'/>
              </Card.Body>
                <Card.Footer>
                <Row justify='space-around'>
                <a href='https://github.com/QtieCoder' target='_blank' rel='noreferrer noopener'>
                  <Image src={GitHubLogo} className={styles.scaleDown} width={40} height={40} alt='logo-gif' />
                </a>
                <a href='https://www.linkedin.com/in/quyencalixto/' target='_blank' rel='noreferrer noopener'>
                  <Image src={LinkedInLogo} width={40} height={40} alt='logo-gif' />
                </a>
                </Row>
                </Card.Footer>
              </Card>
              <Card css={{ w: '65%', borderRadius: '0' }}>
              <Spacer y={2.6} />
            
              <Card.Body css={{ py: '$10' }}>
              <Text>
              About me
            </Text>
              </Card.Body>

            </Card>
          </Grid>
        </Grid>
      </Grid.Container>
    </div>
  );
}


export default Team;
