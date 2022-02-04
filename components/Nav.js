import Link from 'next/link';
import React from 'react';
import styles from '../styles/Nav.module.css';
import GitHubStar from './GitHubStar';
import GQLevated from './GQLevated.js';

function Nav() {
  //{transition} pass this to nav bar in order to get the below to work
  // //this is changing display values/ class the nav has

  // const [show, setShow] = useState(false);

  // const transitionNavBar = () => {
  //   if (transition && window.scrollY > 250) setShow(true);
  //   else {
  //     setShow(false);
  //   }
  // }

  // useEffect(() => {
  //   let mounted = true;
  //   if (transition && mounted && window.scrolly > 250) setShow(true);

  //   if (transition){
  //     window.addEventListener('scroll', transitionNavBar);
  //   } else setShow(true);

  //   return () => {
  //     mounted = false;
  //     window.removeEventListener('scroll', transitionNavBar);
  //   }
  // },{show, transition});

  return (
    <div className={styles.navbar}>
      <nav>
        <ul className={styles.ul}>
          <Link href='/'>
            <li className='hover list-item'>Home</li>
          </Link>
          <Link href='/#learn'>
            <li className='hover list-item'>Tutorial</li>
          </Link>
          <Link href='/about'>
            <li className='hover list-item'>About Us</li>
          </Link>

          <Link href='/demo'>
            <li className='hover list-item'>Use GQLevated</li>
          </Link>
        </ul>
      </nav>
      {/* LOGO */}
      <GQLevated />
      <GitHubStar />
    </div>
  );
}

export default Nav;
