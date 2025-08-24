import { Container } from '@/components/Container';
import React from 'react';

import styles from './Header.module.css';
import { Button2 } from '@/components/Button2';

export const Header: React.FC = () => {
  return (
    <Container fluid>
      <header className={styles.flex}>
        <div className={styles.menu}>
          <ul className={styles.menu__submenu}>
            <li>
              <a href="#!">
                <img src="/logo.svg" alt="logo" />
              </a>
            </li>
            <li>
              <a href="#!">Product</a>
            </li>
            <li>
              <a href="#!">Pricing</a>
            </li>
            <li>
              <a href="#!">Changelog</a>
            </li>
          </ul>
          <ul className={styles.menu__submenu}>
            <li>
              <a href="#!">Log in</a>
            </li>
            <li>
              <Button2 className={styles.menu__sign_up} href="#!">
                Sign up
              </Button2>
            </li>
          </ul>
        </div>
      </header>
    </Container>
  );
};
