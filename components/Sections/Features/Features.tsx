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
        title="AI-Powered Form Generation"
        description="Create dynamic, validated forms instantly with Stellar. Customize fields, layouts, and validations using AI-generated schemas."
        button={{ href: '#!', title: 'Try Now' }}
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
        title="Credits & Usage Tracking"
        description="Manage your AI generation credits seamlessly. Monitor usage, top-up via PayPal, and optimize AI requests within Stellar's free tier limits."
        button={{ href: '#!', title: 'Manage Credits' }}
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
        title="Form Management Dashboard"
        description="View, edit, and organize all your forms in one place. Track submissions, analyze responses, and publish public URLs effortlessly."
        button={{ href: '#!', title: 'View Dashboard' }}
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
        title="Admin & Security Controls"
        description="Control user roles, monitor AI API usage, and ensure secure JWT-based authentication. Stellar scales safely for teams of any size."
        button={{ href: '#!', title: 'Learn More' }}
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
          <h3>AI-Powered Form Builder</h3>
          <h2>
            Generate, customize, and manage forms effortlessly with Stellar
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
