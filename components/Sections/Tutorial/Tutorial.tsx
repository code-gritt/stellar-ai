'use client';

import { Container, Button1 } from '@/components';
import React from 'react';
import { motion, useInView } from 'motion/react';

import styles from './Tutorial.module.css';

interface CardProps {
  title: string;
  description: string;
  img: string;
}

const Card: React.FC<CardProps> = (props) => {
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
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </motion.div>
      <motion.img
        src={props.img}
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
  img: string;
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
      <img src={img} />
      <p>{description}</p>
    </motion.div>
  );
};

const CardContent: CardProps[] = [
  {
    img: '/tutorial_card1.png',
    title: 'Comprehensive Component Library',
    description:
      'DesignCode UI offers an expansive library of UI components, each meticulously crafted for functionality and aesthetics.',
  },
  {
    img: '/tutorial_card2.png',
    title: 'Interactive Design Guidance',
    description: `Our platform provides real-time guidance and advice on UI design best practices whether you're working on layout optimization, color scheme selection, or typography.`,
  },
];

const FooterItems: FooterItemProps[] = [
  {
    img: '/number_1.svg',
    description:
      'Drag and drop. Enhance your design workflow with our drag-and-drop feature, allowing for easy placement and rearrangement of UI components.',
  },
  {
    img: '/number_2.svg',
    description:
      'Customize. Our customization options empower designers to tailor UI components to their specific needs. Adjust colors, fonts, and sizes.',
  },
];

export const Tutorial: React.FC = () => {
  return (
    <Container>
      <div className={styles.root}>
        <div className={styles.title}>
          <h2>
            Master Design Systems. Streamline your workflow, enhance aesthetics,
            and create stunning interfaces with our specialized, user-friendly,
            and comprehensive design insights.
          </h2>
          <Button1
            text="START FREE TRIAL"
            style={{ width: '214px', height: '44px' }}
            href="#!"
          />
        </div>
        <div className={styles.body}>
          <img src="/blur_1.webp" className={styles.blur} />
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
