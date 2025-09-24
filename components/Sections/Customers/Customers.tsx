'use client';

import React from 'react';
import { NumberUp, TypingText } from '@/components';
import { useInView, motion, Variants, stagger } from 'motion/react';

import styles from './Customers.module.css';

const MotionTitle: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div className={styles.title} {...{ ref }}>
      <h2>Used by top teams across the globe</h2>
      <div>
        <span>
          <NumberUp
            number={110}
            transition={{
              duration: 3,
            }}
            {...{ isInView }}
          />
          K
        </span>
        <span>
          <TypingText>Customers since 2023</TypingText>
        </span>
      </div>
    </motion.div>
  );
};

const MotionCustomers: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });

  return (
    <motion.img
      className={styles.customers}
      src="/customers.svg"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1, transition: { duration: 1 } } : {}}
      {...{ ref }}
    />
  );
};

const FooterVariants: Variants = {
  show: {
    transition: { delayChildren: stagger(0.5) },
  },
};

const FooterItemVariants: Variants = {
  hide: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const MotionFooter: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      className={styles.footer}
      initial="hide"
      animate={isInView ? 'show' : ''}
      variants={FooterVariants}
      {...{ ref }}
    >
      <motion.img
        className={styles.footer__logo}
        src="/openai_logo.svg"
        variants={FooterItemVariants}
      />
      <motion.p variants={FooterItemVariants}>
        This UI kit commendably goes against the grain by introducing creative,
        vibrant diffusions of color and light with glass, line, and flat styling
        options, all with accompanying dark and light modes. All of these
        components could easily be used as the foundation for a new project that
        wants to stand out.
      </motion.p>
      <motion.div
        className={styles.footer__person}
        variants={FooterItemVariants}
      >
        <img src="/avatar.png" />
        <div>
          <span>Brendan Ciccone</span>
          <span>Startup design partner</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Customers: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <MotionCustomers />
        <img className={styles.customer__bg_1} src="/customers_bg_1.png" />
        <img className={styles.customer__bg_2} src="/customers_bg_2.png" />
        <img className={styles.lines} src="/lines_3.svg" />
        <MotionTitle />
        <MotionFooter />
      </div>
    </div>
  );
};
