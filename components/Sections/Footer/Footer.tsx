import React from 'react';

import styles from './Footer.module.css';
import { Container } from '@/components/Container';

export const Footer: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.lights}></div>
      <Container>
        <div className={styles.top}>
          <a href="#!">
            <img src="/logo.svg" />
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
                  <img src="/social_1.svg" />
                </a>
                <a href="#!">
                  <img src="/social_2.svg" />
                </a>
                <a href="#!">
                  <img src="/social_3.svg" />
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
                <img src="/arrow_up.svg" />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
