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
        title="200+ Customizable Components"
        description="A collection of versatile components that can be tailored to fit the specific needs of your project, ensuring both aesthetic appeal and functionality."
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
        title="2000+ Figma Variants"
        description="This vast selection of variants offers designers the flexibility to adapt each element to different use cases and design contexts, enhancing the user experience."
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
        title="2,116 Unique Icons"
        description="Enhance your design with a comprehensive set of icons, each crafted to complement various design themes and improve interface navigation."
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
        title="180+ Variables"
        description="These variables provide the flexibility to create responsive designs that are visually appealing and function well across different devices and themes."
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
                DesignCode UI provides an extensive design system that includes
                hundreds of Figma UI components and templates, all ready for
                integration with Framer.
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
