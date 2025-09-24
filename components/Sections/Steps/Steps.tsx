'use client';

import React from 'react';

import styles from './Steps.module.css';
import { Container, Score1, Button1 } from '@/components';
import { useInView, motion, stagger, Variants } from 'motion/react';

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

      <img className={styles.flight_img} src="/flight.png" />
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
      Craft captivating websites with a canvas you already know
    </motion.h2>
  );
};

interface ItemType {
  title: string;
  description: string;
}

const Items: ItemType[] = [
  {
    title: 'Components',
    description:
      'A collection of versatile components that can be tailored to fit the specific needs of your project, ensuring both aesthetic appeal and functionality.',
  },
  {
    title: 'Glass, Outline, Flat styles',
    description:
      'Choose from these diverse design styles to cater to different aesthetic preferences and project requirements.',
  },
  {
    title: 'Templates and Sections',
    description:
      'Streamline your design process with ready-to-use templates and sections, adaptable to various web projects.',
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
    <motion.img
      className={styles.blur}
      src="/blur_2.png"
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
