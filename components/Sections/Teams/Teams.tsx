'use client';

import { Container } from '@/components/Container';
import React from 'react';

import styles from './Teams.module.css';
import { useInView, motion } from 'motion/react';

const MotionTitle: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'all' });

  return (
    <motion.div
      className={styles.title}
      initial={{ opacity: 0, y: 18 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, transition: { type: 'spring', duration: 1 } }
          : {}
      }
      {...{ ref }}
    >
      <h2>Used by top teams</h2>
      <div className={styles.title__line_2}>
        <span>across</span>
        <span>the globe</span>
      </div>
    </motion.div>
  );
};

const MotionCompanies: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'all' });

  return (
    <motion.img
      className={styles.companies}
      src="/companies.svg"
      initial={{ filter: 'blur(5px)', opacity: 0 }}
      animate={
        isInView
          ? { filter: 'none', opacity: 1, transition: { duration: 1 } }
          : {}
      }
      {...{ ref }}
    />
  );
};

export const Teams: React.FC = () => {
  return (
    <Container>
      <section className={styles.root}>
        <MotionTitle />
        <MotionCompanies />
        <img className={styles.blur} src="/blur_1.webp" />
        <img className={styles.earth} src="/earth.png" />
      </section>
    </Container>
  );
};
