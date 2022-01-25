import React from 'react';
import styles from '../styles/Team.module.css';
import { Container, Row, Col, Grid, Card, Text } from '@nextui-org/react';
import Image from 'next/image';
import JC from '../public/JC.png';
import JA from '../public/JA.png';
import NG from '../public/NG.png';
import QC from '../public/QC.png';

function Team() {
  const list = [
      {
        title: 'John Alicastro',
        img: JA,
        price: '$5.50'
      },
      {
        title: 'Johnson Che',
        img: JC,
        price: '$3.00'
      },
      {
        title: 'Nicholas Gonazalez',
        img: NG,
        price: '$10.00'
      },
      {
        title: 'Quyen Calixto',
        img: QC,
        price: '$5.30'
      },
 
  ];
  return (
  <Grid.Container gap={10} justify="flex-start">
    {list.map((item, index) => (
      <Grid lg={3} sm={3} key={index}>
        <Card hoverable clickable width="100%">
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              objectFit="cover"
              src={item.img}
              width='100%'
              height={140}
              alt={item.title}
            />
          </Card.Body>
          <Card.Footer justify="flex-start">
            <Row justify="space-between">
              <Text b>
                {item.title}
              </Text>
              <Text weight={500} style={{ opacity: 0.6 }}>
                {item.price}
              </Text>
            </Row>        
          </Card.Footer>
        </Card>
      </Grid>
    ))}
  </Grid.Container>
  ); }

// function Team() {
//   return( 
//   <div className={styles.team} id='team'>
//   <h1>Meet the Team</h1>
//   <br></br>
//     <div className={styles.imgContainer}>
//       <Image src={JA} alt='team-gif' />

//       <Image src={JC} alt='team-gif' />

//       <Image src={NG} alt='team-gif' />

//       <Image src={QC} alt='team-gif' />
//       <div className={styles.name}>
//         <p>Johnson Che</p>
//         <div className={styles.links}>
//           <a href="https://www.linkedin.com/in/JohnsonChe/"></a>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// }

export default Team;