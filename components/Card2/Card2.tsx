import React from 'react';
import { type StaticImageData } from 'next/image';
import Image from 'next/image';

import styles from './Card2.module.css';

import ArrowRightImg from '@/public/arrow_right.svg';

interface ButtonProps {
  href: string;
  title: string;
}

interface ClassNamesProps {
  root?: string;
}

export interface Card2Props {
  classNames?: ClassNamesProps;
  headerImg: string | StaticImageData;
  title: string;
  description: string;
  button: ButtonProps;
  reverse?: boolean;
}

export const Card2: React.FC<Card2Props> = (props) => {
  return (
    <div className={`${styles.root} ${props.classNames?.root ?? ''}`.trim()}>
      {!props.reverse ? (
        <Image className={styles.top__img} src={props.headerImg} alt="" />
      ) : null}
      <div className={styles.body}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <a href={props.button.href} className={styles.button}>
          <span>{props.button.title}</span> <Image src={ArrowRightImg} alt="" />
        </a>
      </div>
      {props.reverse ? (
        <Image className={styles.top__img} src={props.headerImg} alt="" />
      ) : null}
    </div>
  );
};
