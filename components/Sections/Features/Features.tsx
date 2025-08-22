import React from 'react';
import styles from './Features.module.css';

export const Features: React.FC = () => {
  return (
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
          <div className={`${styles.card} ${styles.card1}`}>
            <div className={styles.card__blur}></div>
            <img className={styles.card__img} src="/feature_card1.png" />
          </div>
          <div className={`${styles.card} ${styles.card2}`}>
            <div className={styles.card__blur}></div>
            <img className={styles.card__img} src="/feature_card2.png" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={`${styles.card} ${styles.card3}`}>
            <div className={styles.card__blur}></div>
            <img className={styles.card__img} src="/feature_card3.png" />
          </div>
          <div className={`${styles.card} ${styles.card4}`}>
            <div className={styles.card__blur}></div>
            <img className={styles.card__img} src="/feature_card4.png" />
          </div>
        </div>
      </div>
    </section>
  );
};
