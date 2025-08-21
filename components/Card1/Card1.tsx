import React from 'react';
import styles from './Card1.module.css';

export interface Card1Props {
  style?: React.CSSProperties;
  img: string;
  title: string;
  description: string;
}

export const Card1: React.FC<Card1Props> = ({
  style,
  description,
  img,
  title,
}) => {
  return (
    <div {...{ style }} className={styles.root}>
      <img src={img} />
      <div className={styles.text}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
