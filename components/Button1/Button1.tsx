import React from 'react';
import styles from './Button1.module.css';

export interface Button1Props {
  href: string;
  text: string;
  style?: React.CSSProperties;
}

export const Button1: React.FC<Button1Props> = ({ href, text, style }) => {
  return (
    <a {...{ href, style }} className={styles.root}>
      <div className={styles.content}>
        {text} <img src="/chevron_right.svg" />
      </div>
    </a>
  );
};
