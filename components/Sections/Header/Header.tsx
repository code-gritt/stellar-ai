import { Container, NavbarMenu } from '@/components';
import React from 'react';
import Image from 'next/image';

import logoImg from '@/public/logo.svg';

import styles from './Header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.root}>
      <input className={styles.checkbox} type="checkbox" />
      <div className={styles.holder}>
        <Container>
          <div className={styles.flex}>
            <a href="#!">
              <Image src={logoImg} alt="logo" />
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
