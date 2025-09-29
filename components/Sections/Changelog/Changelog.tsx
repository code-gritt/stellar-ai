'use client';

import React from 'react';
import { Container, Button1, Card1 } from '@/components';
import { motion, useInView } from 'motion/react';
import Image from 'next/image';

import styles from './Changelog.module.css';

import Blur3Img from '@/public/blur_3.png';
import LessonImg from '@/public/lesson.svg';
import TicketImg from '@/public/ticket.svg';
import ChartImg from '@/public/chart.svg';
import CardsImg from '@/public/cards.svg';

const MotionCard1: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={
        isInView ? { opacity: 1, x: 0, transition: { duration: 0.5 } } : {}
      }
      {...{ ref }}
    >
      <Card1
        className={styles.col7Card1}
        img={LessonImg}
        title="AI-Powered Form Generation"
        description="Generate dynamic, validated forms instantly using Google Gemini API. Customize layouts, fields, and validations with an intuitive drag-and-drop editor."
      />
    </motion.div>
  );
};

const MotionCard2: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.5 } }
          : {}
      }
      {...{ ref }}
    >
      <Card1
        className={styles.col5Card1}
        img={TicketImg}
        title="Credits & Monetization"
        description="Each AI form generation costs credits. Track usage, top up via PayPal, and monitor AI API quotas, ensuring smooth, scalable operations."
      />
    </motion.div>
  );
};

const MotionCard3: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView ? { opacity: 1, y: 0, transition: { duration: 0.5 } } : {}
      }
      {...{ ref }}
    >
      <Card1
        className={styles.col5Card1}
        img={ChartImg}
        title="Form Management Dashboard"
        description="Easily manage all forms, view submissions, track analytics, and publish public URLs or embed forms externally without requiring login."
      />
    </motion.div>
  );
};

const MotionCard4: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }
          : {}
      }
      {...{ ref }}
    >
      <Card1
        className={styles.col7Card1}
        img={CardsImg}
        title="Admin & Security Features"
        description="Role-based access, admin dashboards, audit logs, secure JWT authentication, and caching strategies ensure both safety and scalability."
      />
    </motion.div>
  );
};

export const Changelog: React.FC = () => {
  return (
    <Container>
      <section className={styles.root}>
        <Image src={Blur3Img} className={styles.blur} alt="" />
        <div className="row">
          <div className="col-12">
            <div className={styles.title}>
              <h2>
                Stellar brings AI-powered form building to your fingertips.
                Create, customize, and manage forms efficiently with 100 free
                starting credits.
              </h2>
              <Button1
                text="GET STARTED"
                style={{ width: '184px', height: '44px' }}
                href="#!"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <MotionCard1 />
          </div>
          <div className="col-5">
            <MotionCard2 />
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <MotionCard3 />
          </div>
          <div className="col-7">
            <MotionCard4 />
          </div>
        </div>
      </section>
    </Container>
  );
};
