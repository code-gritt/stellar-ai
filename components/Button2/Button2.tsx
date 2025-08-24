import React, { type ReactNode } from 'react';

import styles from './Button2.module.css';

export interface Button2Props {
  children: ReactNode;
  href: string;
  className?: string;
}

export const Button2: React.FC<Button2Props> = (props) => {
  return (
    <a
      className={`${styles.root} ${props.className ?? ''}`.trim()}
      href={props.href}
    >
      {props.children}
    </a>
  );
};
