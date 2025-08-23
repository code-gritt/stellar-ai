import React from 'react';

import styles from './HeroCard.module.css';

export const HeroCard: React.FC = () => {
  return (
    <div className={styles.root}>
      <img className={styles.background__img} src="/main_card.png" />
      <img className={styles.top__img} src="/main_card_video.svg" />
      <div className={styles.body}>
        <h3>Modular Design Systems</h3>
        <p>
          Explore the art of building scalable, cohesive design systems that
          streamline UI development and enhance team collaboration.
        </p>
        <a href="#!" className={styles.button}>
          Start course <img src="/arrow_right.svg" />
        </a>
      </div>
    </div>
  );
};
