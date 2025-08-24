import React from 'react';

import styles from './Customers.module.css';

export const Customers: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img className={styles.customers} src="/customers.svg" />
        <img className={styles.customer__bg_1} src="/customers_bg_1.png" />
        <img className={styles.customer__bg_2} src="/customers_bg_2.png" />
        <img className={styles.lines} src="/lines_3.svg" />
        <div className={styles.title}>
          <h2>Used by top teams across the globe</h2>
          <div>
            <span>110K</span>
            <span>Customers since 2023</span>
          </div>
        </div>
        <div className={styles.footer}>
          <img className={styles.footer__logo} src="/openai_logo.svg" />
          <p>
            This UI kit commendably goes against the grain by introducing
            creative, vibrant diffusions of color and light with glass, line,
            and flat styling options, all with accompanying dark and light
            modes. All of these components could easily be used as the
            foundation for a new project that wants to stand out.
          </p>
          <div className={styles.footer__person}>
            <img src="/avatar.png" />
            <div>
              <span>Brendan Ciccone</span>
              <span>Startup design partner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
