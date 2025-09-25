import React from 'react';
import Image, { type StaticImageData } from 'next/image';

import styles from './Card1.module.css';

export interface Card1Props {
  style?: React.CSSProperties;
  img: string | StaticImageData;
  title: string;
  description: string;
  className?: string;
}

export const Card1: React.FC<Card1Props> = ({
  style,
  description,
  img,
  title,
  className,
}) => {
  return (
    <div {...{ style }} className={`${styles.root} ${className ?? ''}`.trim()}>
      <Image src={img} alt="" />
      <div className={styles.text}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
