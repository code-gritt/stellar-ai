import { Card2, Score1, Container, Button2 } from '@/components';
import React from 'react';

import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  return (
    <Container fluid>
      <section className={styles.body}>
        <img className={styles.body__lines} src="/lines_1.svg" />
        <div className={styles.body__subsec1}>
          <div className={styles.new_components__holder}>
            <Button2 href="#!" className={styles.new_components}>
              New components <img src="/chevron_right.svg" />
            </Button2>
          </div>
          <div className={styles.title}>
            <h1>Craft Stunning User Interfaces</h1>
          </div>
          <div className={styles.description}>
            This UI kit is a perfect blend of modern design and practical
            usability, making it an ideal choice for a wide range of projects
            including web applications, mobile apps, and dashboard interfaces.
          </div>
          <div className={styles.start_btn__holder}>
            <a href="#!" className={styles.start_btn}>
              START FREE TRIAL <img src="/chevron_right.svg" />
            </a>
          </div>
        </div>
        <div className={styles.body__subsec2}>
          <div className={styles.body__lights_fill}></div>
          <div className={styles.body__lights_border}></div>
          <div className={styles.body__contrast}></div>
          <img className={styles.body__circle_1} src="/circle_1.png" />
          <div className={styles.body__circle_2}></div>
          <img className={styles.body__browse_app} src="/browse_app.png" />

          <Card2
            bgImg="/main_card.svg"
            headerImg="/main_card_video.svg"
            title="Modular Design Systems"
            description="Explore the art of building scalable, cohesive design systems that streamline UI development and enhance team collaboration."
            button={{ href: '#!', title: 'Start course' }}
            classNames={{ root: styles.body__main_card }}
          />

          <Score1 number={98} className={styles.body__score_1} />

          <div className={styles.body__score_2}>
            <div>
              <div className={styles.body__score_2__blur}></div>
              <div className={styles.body__score_2__text}>50%</div>
              <img className={styles.body__score_2_img} src="/score_2.svg" />
              <div className={styles.body__score_2__holder_2}>
                <img
                  className={styles.body__score_2__circle_1}
                  src="/circle_1.svg"
                />
                <div className={styles.body__score_2__arrow_1}>
                  <img src="/arrow_1.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
