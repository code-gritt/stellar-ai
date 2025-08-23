import { Container, Button1 } from '@/components';
import React from 'react';

import styles from './Tutorial.module.css';

interface CardProps {
  title: string;
  description: string;
  img: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div className={styles.card__root}>
      <div className={styles.card__shadow}></div>
      <div className={styles.card__title}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <img src={props.img} />
    </div>
  );
};

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
          <img src="/blur_1.png" className={styles.blur} />
          <div className={styles.row}>
            <Card
              img="/tutorial_card1.png"
              title="Comprehensive Component Library"
              description="DesignCode UI offers an expansive library of UI components, each meticulously crafted for functionality and aesthetics."
            />
            <Card
              img="/tutorial_card2.png"
              title="Interactive Design Guidance"
              description="Our platform provides real-time guidance and advice on UI design best practices whether you're working on layout optimization, color scheme selection, or typography."
            />
          </div>
          <div className={styles.footer}>
            <div className={styles.footer__row}>
              <div className={styles.footer__content}>
                <img src="/number_1.svg" />
                <p>
                  Drag and drop. Enhance your design workflow with our
                  drag-and-drop feature, allowing for easy placement and
                  rearrangement of UI components.
                </p>
              </div>
              <div className={styles.footer__content}>
                <img src="/number_2.svg" />
                <p>
                  Customize. Our customization options empower designers to
                  tailor UI components to their specific needs. Adjust colors,
                  fonts, and sizes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
