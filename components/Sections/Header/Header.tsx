import { Container } from '@/components/Container';
import React from 'react';

import styles from './Header.module.css';
import { NavbarMenu } from '@/components';

export const Header: React.FC = () => {
  return (
    <header className={styles.root}>
      <input className={styles.checkbox} type="checkbox" />
      <div className={styles.holder}>
        <Container>
          <div className={styles.flex}>
            <a href="#!">
              <img src="/logo.svg" alt="logo" />
            </a>
            <NavbarMenu classNames={{ root: styles.desktop_menu }}>
              <div className={styles.hamburger}>
                <div className={styles.hamburger__lines}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </NavbarMenu>
          </div>
        </Container>
      </div>
      <NavbarMenu
        classNames={{
          root: styles.mobile_menu,
          submenu: styles.mobile_menu__submenu,
        }}
      />
    </header>
  );
};
