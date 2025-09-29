'use client';

import { Container, Button1, MotionNextJSImage } from '@/components';
import React from 'react';
import { motion, useInView } from 'motion/react';
import Image, { type StaticImageData } from 'next/image';

import styles from './Tutorial.module.css';

import TutorialCard1Img from '@/public/tutorial_card1.png';
import TutorialCard2Img from '@/public/tutorial_card2.png';
import Number1Img from '@/public/number_1.svg';
import Number2Img from '@/public/number_2.svg';
import Blur1Img from '@/public/blur_1.webp';

interface CardProps {
  title: string;
  description: string;
  img: StaticImageData;
}

const Card: React.FC<CardProps> = ({ title, description, img }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div className={styles.card__root} {...{ ref }}>
      <div className={styles.card__shadow}></div>
      <motion.div
        className={styles.card__title}
        initial={{ opacity: 0, x: -20 }}
        animate={
          isInView ? { opacity: 1, x: 0, transition: { duration: 1 } } : {}
        }
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </motion.div>
      <MotionNextJSImage
        src={img}
        alt=""
        initial={{ opacity: 0, x: 20 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, transition: { duration: 1, delay: 0.5 } }
            : {}
        }
      />
    </div>
  );
};

interface FooterItemProps {
  img: StaticImageData;
  description: string;
}

const FooterItem: React.FC<FooterItemProps> = ({ description, img }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 'all' });

  return (
    <motion.div
      className={styles.footer__content}
      initial={{ opacity: 0, y: 20 }}
      animate={
        isInView ? { opacity: 1, y: 0, transition: { duration: 1 } } : {}
      }
      {...{ ref }}
    >
      <Image src={img} alt="" />
      <p>{description}</p>
    </motion.div>
  );
};

const CardContent: CardProps[] = [
  {
    img: TutorialCard1Img,
    title: 'AI-Powered Form Builder',
    description:
      'Create dynamic, validated forms instantly with Stellar. Customize fields, layouts, and validations using AI-generated schemas.',
  },
  {
    img: TutorialCard2Img,
    title: 'Intelligent Design Assistance',
    description:
      'Stellar provides real-time guidance and AI-powered suggestions to streamline form creation, improve UX, and save time.',
  },
];

const FooterItems: FooterItemProps[] = [
  {
    img: Number1Img,
    description:
      'Drag & Drop Editor: Effortlessly arrange and customize form components with an intuitive drag-and-drop interface.',
  },
  {
    img: Number2Img,
    description:
      'Credit Tracking & Monetization: Monitor AI usage, manage credits, and top up seamlessly with integrated payment options.',
  },
];

export const Tutorial: React.FC = () => {
  return (
    <Container>
      <div className={styles.root}>
        <div className={styles.title}>
          <h2>
            Master form creation with Stellar. Streamline your workflow,
            leverage AI, and build responsive, fully customizable forms with
            ease.
          </h2>
          <Button1
            text="START FREE TRIAL"
            style={{ width: '214px', height: '44px' }}
            href="#!"
          />
        </div>
        <div className={styles.body}>
          <Image src={Blur1Img} alt="" className={styles.blur} />
          <div className={styles.row}>
            {CardContent.map((props, key) => (
              <Card {...props} key={key} />
            ))}
          </div>
          <div className={styles.footer}>
            <div className={styles.footer__row}>
              {FooterItems.map((props, key) => (
                <FooterItem {...props} key={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
