'use client';

import {
  Card2,
  Score1,
  Container,
  Button2,
  TypingText,
  FadeUp,
} from '@/components';
import React, { useEffect } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  Variants,
} from 'motion/react';

import styles from './Hero.module.css';

const MotionBrowseAppImage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
    >
      <img src="/browse_app.webp" />
      <div className={styles.body__lights_fill}></div>
      <div className={styles.body__lights_border}></div>
    </motion.div>
  );
};

const MotionCard: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const variants: Variants = {
    hide: { scale: 0 },
    show: { scale: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div
      initial="hide"
      animate={isInView ? 'show' : ''}
      className={styles.motion__body__main_card}
      {...{ ref, variants }}
    >
      <Card2
        headerImg="/main_card_video.webp"
        title="Modular Design Systems"
        description="Explore the art of building scalable, cohesive design systems that streamline UI development and enhance team collaboration."
        button={{ href: '#!', title: 'Start course' }}
        classNames={{ root: styles.body__main_card }}
      />
    </motion.div>
  );
};

const MotionScore2: React.FC = () => {
  const animationDelay = 1;
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, 50, {
        duration: 5,
        delay: animationDelay,
      });

      return () => controls.stop();
    }
  }, [isInView]);

  return (
    <motion.div
      className={styles.body__score_2}
      initial={{ opacity: 0 }}
      animate={
        isInView
          ? { opacity: 1, transition: { duration: 1, delay: animationDelay } }
          : {}
      }
      {...{ ref }}
    >
      <div>
        <div className={styles.body__score_2__blur}></div>
        <div className={styles.body__score_2__text}>
          <motion.span>{rounded}</motion.span>%
        </div>
        <img className={styles.body__score_2_img} src="/score_2.svg" />
        <motion.div
          className={styles.body__score_2__holder_2}
          whileInView={{
            rotate: 360,
            transition: { duration: 6, ease: 'linear', repeat: Infinity },
          }}
        >
          <img className={styles.body__score_2__circle_1} src="/circle_1.svg" />
          <div className={styles.body__score_2__arrow_1}>
            <img src="/arrow_1.svg" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  return (
    <div className={styles.root}>
      <img className={styles.lines} src="/lines_1.svg" />
      <img className={styles.blur} src="/blur_5.webp" />
      <Container>
        <section className={styles.body}>
          <div className={styles.body__subsec1}>
            <div className={styles.new_components__holder}>
              <Button2 href="#!" className={styles.new_components}>
                New components <img src="/chevron_right.svg" />
              </Button2>
            </div>
            <div className={styles.title}>
              <h1>
                <TypingText>Craft Stunning User Interfaces</TypingText>
              </h1>
            </div>
            <FadeUp>
              <div className={styles.description}>
                This UI kit is a perfect blend of modern design and practical
                usability, making it an ideal choice for a wide range of
                projects including web applications, mobile apps, and dashboard
                interfaces.
              </div>
            </FadeUp>
            <div className={styles.start_btn__holder}>
              <a href="#!" className={styles.start_btn}>
                START FREE TRIAL <img src="/chevron_right.svg" />
              </a>
            </div>
          </div>
          <div className={styles.body__subsec2}>
            <div className={styles.body__browse_app}>
              <MotionBrowseAppImage />
              <MotionCard />
            </div>

            <Score1
              number={98}
              className={styles.body__score_1}
              animationDelay={1}
            />

            <MotionScore2 />
          </div>
        </section>
      </Container>
    </div>
  );
};
