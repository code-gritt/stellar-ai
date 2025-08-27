import React from 'react';

import styles from './Card2.module.css';

interface ButtonProps {
  href: string;
  title: string;
}

interface ClassNamesProps {
  root?: string;
}

export interface Card2Props {
  classNames?: ClassNamesProps;
  headerImg: string;
  title: string;
  description: string;
  button: ButtonProps;
  reverse?: boolean;
}

export const Card2: React.FC<Card2Props> = (props) => {
  return (
    <div className={`${styles.root} ${props.classNames?.root ?? ''}`.trim()}>
      {!props.reverse ? (
        <img className={styles.top__img} src={props.headerImg} />
      ) : null}
      <div className={styles.body}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <a href={props.button.href} className={styles.button}>
          <span>{props.button.title}</span> <img src="/arrow_right.svg" />
        </a>
      </div>
      {props.reverse ? (
        <img className={styles.top__img} src={props.headerImg} />
      ) : null}
    </div>
  );
};
