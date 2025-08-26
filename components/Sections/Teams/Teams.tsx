import { Container } from '@/components/Container';
import React from 'react';

import styles from './Teams.module.css';

export const Teams: React.FC = () => {
  return (
    <Container>
      <section className={styles.root}>
        <div className={styles.title}>
          <h2>Used by top teams</h2>
          <div className={styles.title__line_2}>
            <span>across</span>
            <span>the globe</span>
          </div>
        </div>
        <img className={styles.companies} src="/companies.svg" />
        <img className={styles.blur} src="/blur_1.png" />
        <img className={styles.earth} src="/earth.png" />
      </section>
    </Container>
  );
};
