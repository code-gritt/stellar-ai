import React from 'react';
import styles from './Features.module.css';
import { Card2, Container } from '@/components';

export const Features: React.FC = () => {
  return (
    <Container>
      <section className={styles.root}>
        <img className={styles.blur} src="/blur_4.png" />
        <div className={styles.title}>
          <img className={styles.title__lines} src="/lines_2.svg" />
          <h3>3 hours of video</h3>
          <h2>
            Quick and beautiful web design: Streamlining your creative process
          </h2>
        </div>
        <div className={styles.body}>
          <div className={styles.row}>
            <Card2
              headerImg="feature_card1_pay.png"
              title="Modular Design Systems"
              description="Explore the art of building scalable, cohesive design systems that streamline UI development and enhance team collaboration."
              button={{ href: '#!', title: 'Templates' }}
              classNames={{ root: styles.card1 }}
            />
            <Card2
              headerImg="feature_card2_video.png"
              title="UI Kits: Bridging Design and Code"
              description="An in-depth guide to understanding the core principles, structures, and benefits of well-organized design systems in digital products."
              button={{ href: '#!', title: 'Documentation' }}
              classNames={{ root: styles.card2 }}
              reverse
            />
          </div>
          <div className={styles.row}>
            <Card2
              headerImg="feature_card3_video.png"
              title="The Anatomy of Effective Design Systems"
              description="Uncover the secrets of seamlessly integrating UI kits into your development workflow, enhancing both design quality and coding efficiency."
              button={{ href: '#!', title: 'Components' }}
              classNames={{ root: styles.card3 }}
            />
            <Card2
              headerImg="feature_card4_video.png"
              title="Strategies in Component Design"
              description="Learn how to design and implement versatile, reusable components to elevate the functionality and aesthetics of your UI projects."
              button={{ href: '#!', title: 'Start course' }}
              classNames={{ root: styles.card4 }}
              reverse
            />
          </div>
        </div>
      </section>
    </Container>
  );
};
