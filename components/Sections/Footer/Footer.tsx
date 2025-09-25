import React from 'react';
import { Container } from '@/components/Container';
import Image from 'next/image';

import styles from './Footer.module.css';

import LogoImg from '@/public/logo.svg';
import Social1Img from '@/public/social_1.svg';
import Social2Img from '@/public/social_2.svg';
import Social3Img from '@/public/social_3.svg';
import ArrowUpImg from '@/public/arrow_up.svg';

export const Footer: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.lights}></div>
      <Container>
        <div className={styles.top}>
          <a href="#!">
            <Image src={LogoImg} alt="" />
          </a>
          <div className={styles.menus}>
            <ul>
              <li>
                <a href="#!">Products</a>
              </li>
              <li>
                <a href="#!">Courses</a>
              </li>
              <li>
                <a href="#!">Tutorials</a>
              </li>
              <li>
                <a href="#!">Pricing</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#!">Company</a>
              </li>
              <li>
                <a href="#!">About Us</a>
              </li>
              <li>
                <a href="#!">Contact Us</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#!">Resources</a>
              </li>
              <li>
                <a href="#!">Downloads</a>
              </li>
              <li>
                <a href="#!">Community</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#!">FOLLOW US</a>
              </li>
              <li className={styles.socials}>
                <a href="#!">
                  <Image src={Social1Img} alt="" />
                </a>
                <a href="#!">
                  <Image src={Social2Img} alt="" />
                </a>
                <a href="#!">
                  <Image src={Social3Img} alt="" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className={styles.bottom}>
        <Container>
          <div className={styles.bottom__body}>
            <span>© 2024 Company</span>
            <div className={styles.bottom__menu}>
              <ul>
                <li>
                  <a href="#!">Terms of Service</a>
                </li>
                <li>
                  <a href="#!">Privacy Policy</a>
                </li>
                <li>
                  <a href="#!">English</a>
                </li>
              </ul>
              <a className={styles.goup} href="#top">
                <Image src={ArrowUpImg} alt="" />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
