'use client';

import { Container, MotionNextJSImage } from '@/components';
import React from 'react';
import { useInView, motion } from 'motion/react';
import Image from 'next/image';

import styles from './Teams.module.css';

import Blur1Img from '@/public/blur_1.webp';
import EarthImg from '@/public/earth.png';
import CompaniesImg from '@/public/companies.svg';

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
      <h2>Trusted by Teams Worldwide</h2>
      <div className={styles.title__line_2}>
        <span>leveraging</span>
        <span>Stellar AI Forms</span>
      </div>
    </motion.div>
  );
};

const MotionCompanies: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'all' });

  return (
    <MotionNextJSImage
      className={styles.companies}
      src={CompaniesImg}
      alt="Stellar client companies"
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
        <Image src={Blur1Img} alt="Background blur" className={styles.blur} />
        <Image src={EarthImg} alt="Global usage map" className={styles.earth} />
      </section>
    </Container>
  );
};
