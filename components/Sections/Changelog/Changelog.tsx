import React from 'react';
import { Container, Button1, Card1 } from '@/components';

import styles from './Changelog.module.css';

export const Changelog: React.FC = () => {
  return (
    <Container>
      <section className={styles.root}>
        <img className={styles.blur} src="/blur_3.png" />
        <div className="row">
          <div className="col-12">
            <div className={styles.title}>
              <h2>
                DesignCode UI provides an extensive design system that includes
                hundreds of Figma UI components and templates, all ready for
                integration with Framer.
              </h2>
              <Button1
                text="GET STARTED"
                style={{ width: '184px', height: '44px' }}
                href="#!"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <Card1
              img="/lesson.svg"
              title="200+ Customizable Components"
              description="A collection of versatile components that can be tailored to fit the specific needs of your project, ensuring both aesthetic appeal and functionality."
            />
          </div>
          <div className="col-5">
            <Card1
              img="/ticket.svg"
              title="2000+ Figma Variants"
              description="This vast selection of variants offers designers the flexibility to adapt each element to different use cases and design contexts, enhancing the user experience."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <Card1
              img="/chart.svg"
              title="2,116 Unique Icons"
              description="Enhance your design with a comprehensive set of icons, each crafted to complement various design themes and improve interface navigation."
            />
          </div>
          <div className="col-7">
            <Card1
              img="/cards.svg"
              title="180+ Variables"
              description="These variables provide the flexibility to create responsive designs that are visually appealing and function well across different devices and themes."
            />
          </div>
        </div>
      </section>
    </Container>
  );
};
