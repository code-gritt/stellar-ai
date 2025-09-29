'use client';

import React from 'react';
import { Container, Score1, Button1, MotionNextJSImage } from '@/components';
import { useInView, motion, stagger, Variants } from 'motion/react';
import Image from 'next/image';

import styles from './Steps.module.css';

import FlightImg from '@/public/flight.png';
import Blur2Img from '@/public/blur_2.png';

const MotionImage: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className={styles.flight}
      initial={{ x: 20, opacity: 0 }}
      animate={
        isInView
          ? {
              x: 0,
              opacity: 1,
              transition: { duration: 1, delay: 1 },
            }
          : {}
      }
      {...{ ref }}
    >
      <Score1 number={98} className={styles.score} animationDelay={1} />

      <Image
        className={styles.flight_img}
        src={FlightImg}
        alt="Stellar Preview"
      />
      <div className={styles.mask}></div>
    </motion.div>
  );
};

const MotionTitle: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'all' });

  return (
    <motion.h2
      className={styles.title}
      initial={{ opacity: 0, x: -20 }}
      animate={
        isInView ? { opacity: 1, x: 0, transition: { duration: 1 } } : {}
      }
      {...{ ref }}
    >
      Build AI-Powered Forms in Minutes
    </motion.h2>
  );
};

interface ItemType {
  title: string;
  description: string;
}

const Items: ItemType[] = [
  {
    title: 'Dynamic Form Generation',
    description:
      'Generate fully functional forms instantly using Stellar’s AI engine, complete with validations and customizable fields.',
  },
  {
    title: 'Drag-and-Drop Editor',
    description:
      'Easily rearrange and customize form fields with our intuitive drag-and-drop interface for maximum flexibility.',
  },
  {
    title: 'Analytics & Submissions',
    description:
      'Track form responses, analyze user interactions, and export data effortlessly for smarter decision-making.',
  },
];

const ItemsVariants: Variants = {
  hide: {
    y: 50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const ItemsParentVariants: Variants = {
  show: {
    transition: { delayChildren: stagger(0.5) },
  },
};

const MotionItems: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      className={styles.features}
      variants={ItemsParentVariants}
      initial="hide"
      animate={isInView ? 'show' : ''}
      {...{ ref }}
    >
      {Items.map(({ description, title }, key) => (
        <motion.div
          className={styles.features__content}
          key={key}
          variants={ItemsVariants}
        >
          <h4>{title}</h4>
          <p>{description}</p>
        </motion.div>
      ))}
      <Button1
        href="#!"
        text="START FREE TRIAL"
        style={{ width: '214px', height: '44px' }}
      />
    </motion.div>
  );
};

const MotionBlur: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <MotionNextJSImage
      className={styles.blur}
      src={Blur2Img}
      alt="Background blur"
      initial={{ opacity: 0 }}
      animate={
        isInView
          ? { opacity: 1, transition: { duration: 0.5, delay: 0.5 } }
          : {}
      }
      {...{ ref }}
    />
  );
};

export const Steps: React.FC = () => {
  return (
    <Container fluid>
      <section className={styles.root}>
        <MotionBlur />

        <div className="row">
          <div className="col-7">
            <div className={styles.left_holder}>
              <MotionTitle />
              <MotionItems />
            </div>
          </div>
          <div className="col-5">
            <MotionImage />
          </div>
        </div>
      </section>
    </Container>
  );
};
