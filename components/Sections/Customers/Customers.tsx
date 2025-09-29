'use client';

import React from 'react';
import { MotionNextJSImage, NumberUp, TypingText } from '@/components';
import { useInView, motion, Variants, stagger } from 'motion/react';
import Image from 'next/image';

import styles from './Customers.module.css';

import CustomersImg from '@/public/customers.svg';
import OpenaiLogoImg from '@/public/openai_logo.svg';
import AvatarImg from '@/public/avatar.png';
import CustomersBg1Img from '@/public/customers_bg_1.png';
import CustomersBg2Img from '@/public/customers_bg_2.png';
import Lines3Img from '@/public/lines_3.svg';

const MotionTitle: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div className={styles.title} {...{ ref }}>
      <h2>Trusted by innovative teams worldwide</h2>

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
          <TypingText>Forms created since launch</TypingText>
        </span>
      </div>
    </motion.div>
  );
};

const MotionCustomers: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });

  return (
    <MotionNextJSImage
      className={styles.customers}
      src={CustomersImg}
      alt=""
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
      <MotionNextJSImage
        className={styles.footer__logo}
        src={OpenaiLogoImg}
        alt=""
        variants={FooterItemVariants}
      />
      <motion.p variants={FooterItemVariants}>
        Stellar revolutionizes AI-powered form building. Teams can generate,
        customize, and manage forms efficiently with dynamic validations,
        analytics, and a scalable credits system.
      </motion.p>
      <motion.div
        className={styles.footer__person}
        variants={FooterItemVariants}
      >
        <Image src={AvatarImg} alt="" />
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
        <Image src={CustomersBg1Img} alt="" className={styles.customer__bg_1} />
        <Image src={CustomersBg2Img} alt="" className={styles.customer__bg_2} />
        <Image src={Lines3Img} alt="" className={styles.lines} />
        <MotionTitle />
        <MotionFooter />
      </div>
    </div>
  );
};
