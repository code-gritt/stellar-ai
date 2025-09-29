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
            <Image src={LogoImg} alt="Stellar Logo" />
          </a>
          <div className={styles.menus}>
            <ul>
              <li>
                <a href="#!">Features</a>
              </li>
              <li>
                <a href="#!">Pricing</a>
              </li>
              <li>
                <a href="#!">Docs</a>
              </li>
              <li>
                <a href="#!">Integrations</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#!">Company</a>
              </li>
              <li>
                <a href="#!">About Stellar</a>
              </li>
              <li>
                <a href="#!">Careers</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#!">Resources</a>
              </li>
              <li>
                <a href="#!">Blog</a>
              </li>
              <li>
                <a href="#!">Support</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#!">Follow Us</a>
              </li>
              <li className={styles.socials}>
                <a href="#!">
                  <Image src={Social1Img} alt="Twitter" />
                </a>
                <a href="#!">
                  <Image src={Social2Img} alt="LinkedIn" />
                </a>
                <a href="#!">
                  <Image src={Social3Img} alt="Facebook" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className={styles.bottom}>
        <Container>
          <div className={styles.bottom__body}>
            <span>© 2024 Stellar</span>
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
                <Image src={ArrowUpImg} alt="Go to top" />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
