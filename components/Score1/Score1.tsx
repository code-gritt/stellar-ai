'use client';

import React from 'react';
import styles from './Score1.module.css';
import { motion, useInView } from 'motion/react';
import { NumberUp } from '@/components';

export interface Score1Props {
  className?: string;
  number: number;
  animationDelay?: number;
}

export const Score1: React.FC<Score1Props> = ({
  className = '',
  number,
  animationDelay = 0,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className={`${className} ${styles.body}`.trim()}
      initial={{ opacity: 0 }}
      animate={
        isInView
          ? { opacity: 1, transition: { duration: 1, delay: animationDelay } }
          : {}
      }
      {...{ ref }}
    >
      <div className={styles.holder}>
        <div className={styles.blur}></div>
        <motion.div className={styles.text}>
          <NumberUp
            {...{ isInView, number }}
            transition={{
              duration: 5,
              delay: animationDelay,
            }}
          />
        </motion.div>
        <img className={styles.img} src="/score_1.svg" />
        <motion.div
          className={styles.holder_2}
          whileInView={{
            rotate: 360,
            transition: { duration: 2, ease: 'linear', repeat: Infinity },
          }}
        >
          <img className={styles.ellipse_1} src="/ellipse_1.svg" />
          <img className={styles.ellipse_2} src="/ellipse_2.svg" />
        </motion.div>
      </div>
    </motion.div>
  );
};
