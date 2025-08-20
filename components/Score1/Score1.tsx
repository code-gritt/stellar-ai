import React from 'react';
import styles from './Score1.module.css';

export interface Score1Props {
  className?: string;
  number: number;
}

export const Score1: React.FC<Score1Props> = ({ className, number }) => {
  className = className ?? '';

  return (
    <div className={`${className} ${styles.body}`.trim()}>
      <div className={styles.holder}>
        <div className={styles.blur}></div>
        <div className={styles.text}>{number}</div>
        <img className={styles.img} src="/score_1.svg" />
        <div className={styles.holder_2}>
          <img className={styles.ellipse_1} src="/ellipse_1.svg" />
          <img className={styles.ellipse_2} src="/ellipse_2.svg" />
        </div>
      </div>
    </div>
  );
};
