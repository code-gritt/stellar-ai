import React, { type ReactNode } from 'react';

import styles from './NavbarMenu.module.css';
import { Button2 } from '../Button2';

interface ClassNames {
  root?: string;
  submenu?: string;
}

export interface NavbarMenuProps {
  classNames?: ClassNames;
  children?: ReactNode;
}

export const NavbarMenu: React.FC<NavbarMenuProps> = (props) => {
  return (
    <>
      <div className={`${styles.root} ${props.classNames?.root ?? ''}`.trim()}>
        <ul
          className={`${styles.submenu} ${props.classNames?.submenu ?? ''}`.trim()}
        >
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
        <ul
          className={`${styles.submenu} ${props.classNames?.submenu ?? ''}`.trim()}
        >
          <li>
            <a href="#!">Log in</a>
          </li>
          <li>
            <Button2 className={styles.sign_up} id="sign_up" href="#!">
              Sign up
            </Button2>
          </li>
        </ul>
      </div>
      {props.children}
    </>
  );
};
