'use client';

import {
  Card2,
  Score1,
  Container,
  Button2,
  TypingText,
  FadeUp,
  NumberUp,
} from '@/components';
import React from 'react';
import { motion, useInView, Variants } from 'motion/react';
import Image from 'next/image';

import BrowseAppImg from '@/public/browse_app.webp';
import Score2Img from '@/public/score_2.svg';
import Circle1Img from '@/public/circle_1.svg';
import Arrow1Img from '@/public/arrow_1.svg';
import Lines1Img from '@/public/lines_1.svg';
import Blur5Img from '@/public/blur_5.webp';
import ChevronRightImg from '@/public/chevron_right.svg';
import MainCardVideoImg from '@/public/main_card_video.webp';

import styles from './Hero.module.css';

const MotionBrowseAppImage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
    >
      <Image
        src={BrowseAppImg}
        alt=""
        className={styles.body__browse_app__img}
      />
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
        headerImg={MainCardVideoImg}
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
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

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
          <NumberUp
            {...{ isInView }}
            number={50}
            transition={{
              duration: 5,
              delay: animationDelay,
            }}
          />
          %
        </div>
        <Image src={Score2Img} alt="" className={styles.body__score_2_img} />
        <motion.div
          className={styles.body__score_2__holder_2}
          whileInView={{
            rotate: 360,
            transition: { duration: 6, ease: 'linear', repeat: Infinity },
          }}
        >
          <Image
            src={Circle1Img}
            alt=""
            className={styles.body__score_2__circle_1}
          />
          <div className={styles.body__score_2__arrow_1}>
            <Image src={Arrow1Img} alt="" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC = () => {
  return (
    <div className={styles.root}>
      <Image src={Lines1Img} alt="" className={styles.lines} />
      <Image src={Blur5Img} alt="" className={styles.blur} />
      <Container>
        <section className={styles.body}>
          <div className={styles.body__subsec1}>
            <div className={styles.new_components__holder}>
              <Button2 href="#!" className={styles.new_components}>
                New components <Image src={ChevronRightImg} alt="" />
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
                START FREE TRIAL <Image src={ChevronRightImg} alt="" />
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
