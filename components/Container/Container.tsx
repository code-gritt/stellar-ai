import React, { type ReactNode } from 'react';
import styles from './Container.module.css';

export interface ContainerProps {
  fluid?: boolean;
  children?: ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  fluid,
  className,
}) => {
  className = className ?? '';

  return (
    <div
      className={`${className} ${fluid ? styles.fluid : styles.default} ${styles.container}`.trim()}
    >
      {children}
    </div>
  );
};
