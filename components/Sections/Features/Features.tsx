'use client';

import React from 'react';
import { Card2, Container } from '@/components';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';

import styles from './Features.module.css';

import FeatureCard1PayImg from '@/public/feature_card1_pay.png';
import FeatureCard2VideoImg from '@/public/feature_card2_video.png';
import FeatureCard3VideoImg from '@/public/feature_card3_video.png';
import FeatureCard4VideoImg from '@/public/feature_card4_video.png';
import Blur4Img from '@/public/blur_4.png';
import Lines2Img from '@/public/lines_2.svg';

const MotionCard1: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={
        isInView ? { scale: 1, transition: { duration: 0.5, delay: 0.5 } } : {}
      }
      className={styles.card1}
      {...{ ref }}
    >
      <Card2
        headerImg={FeatureCard1PayImg}
        title="Modular Design Systems"
        description="Explore the art of building scalable, cohesive design systems that streamline UI development and enhance team collaboration."
        button={{ href: '#!', title: 'Templates' }}
        classNames={{ root: styles.card__root }}
      />
    </motion.div>
  );
};

const MotionCard2: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1, transition: { duration: 0.5 } } : {}}
      className={styles.card2}
      {...{ ref }}
    >
      <Card2
        headerImg={FeatureCard2VideoImg}
        title="UI Kits: Bridging Design and Code"
        description="An in-depth guide to understanding the core principles, structures, and benefits of well-organized design systems in digital products."
        button={{ href: '#!', title: 'Documentation' }}
        classNames={{ root: styles.card__root }}
        reverse
      />
    </motion.div>
  );
};

const MotionCard3: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={
        isInView ? { scale: 1, transition: { duration: 0.5, delay: 0.5 } } : {}
      }
      className={styles.card3}
      {...{ ref }}
    >
      <Card2
        headerImg={FeatureCard3VideoImg}
        title="The Anatomy of Effective Design Systems"
        description="Uncover the secrets of seamlessly integrating UI kits into your development workflow, enhancing both design quality and coding efficiency."
        button={{ href: '#!', title: 'Components' }}
        classNames={{ root: styles.card__root }}
      />
    </motion.div>
  );
};

const MotionCard4: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={isInView ? { scale: 1, transition: { duration: 0.5 } } : {}}
      className={styles.card4}
      {...{ ref }}
    >
      <Card2
        headerImg={FeatureCard4VideoImg}
        title="Strategies in Component Design"
        description="Learn how to design and implement versatile, reusable components to elevate the functionality and aesthetics of your UI projects."
        button={{ href: '#!', title: 'Start course' }}
        classNames={{ root: styles.card__root }}
        reverse
      />
    </motion.div>
  );
};

export const Features: React.FC = () => {
  return (
    <Container>
      <section className={styles.root}>
        <Image src={Blur4Img} alt="" className={styles.blur} />
        <div className={styles.title}>
          <Image src={Lines2Img} alt="" className={styles.title__lines} />
          <h3>3 hours of video</h3>
          <h2>
            Quick and beautiful web design: Streamlining your creative process
          </h2>
        </div>
        <div className={styles.body}>
          <div className={styles.row}>
            <MotionCard1 />
            <MotionCard2 />
          </div>
          <div className={styles.row}>
            <MotionCard3 />
            <MotionCard4 />
          </div>
        </div>
      </section>
    </Container>
  );
};
