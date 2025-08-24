import React from 'react';

import styles from './Steps.module.css';
import { Container, Score1, Button1 } from '@/components';

export const Steps: React.FC = () => {
  return (
    <Container fluid>
      <section className={styles.root}>
        <img className={styles.blur} src="/blur_2.png" />

        <Score1 number={98} className={styles.score} />

        <div className="row">
          <div className="col-6">
            <div className={styles.left_holder}>
              <h2 className={styles.title}>
                Craft captivating websites with a canvas you already know
              </h2>
              <div className={styles.features}>
                <div className={styles.features__content}>
                  <h4>Components</h4>
                  <p>
                    A collection of versatile components that can be tailored to
                    fit the specific needs of your project, ensuring both
                    aesthetic appeal and functionality.
                  </p>
                </div>
                <div className={styles.features__content}>
                  <h4>Glass, Outline, Flat styles</h4>
                  <p>
                    Choose from these diverse design styles to cater to
                    different aesthetic preferences and project requirements.
                  </p>
                </div>
                <div className={styles.features__content}>
                  <h4>Templates and Sections</h4>
                  <p>
                    Streamline your design process with ready-to-use templates
                    and sections, adaptable to various web projects.
                  </p>
                </div>
                <Button1
                  href="#!"
                  text="START FREE TRIAL"
                  style={{ width: '214px', height: '44px' }}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className={styles.flight_img}>
              <img src="/flight.png" />
              <div className={styles.mask}></div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};
