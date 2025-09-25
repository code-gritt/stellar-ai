import React from 'react';
import Image from 'next/image';

import styles from './Button1.module.css';

import ChevronRightImg from '@/public/chevron_right.svg';

export interface Button1Props {
  href: string;
  text: string;
  style?: React.CSSProperties;
}

export const Button1: React.FC<Button1Props> = ({ href, text, style }) => {
  return (
    <a {...{ href, style }} className={styles.root}>
      <div className={styles.content}>
        {text} <Image src={ChevronRightImg} alt="" />
      </div>
    </a>
  );
};
