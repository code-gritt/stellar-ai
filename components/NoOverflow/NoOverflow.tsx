import React, { type ReactNode } from 'react';

import styles from './NoOverflow.module.css';

export interface NoOverflowProps {
  children: ReactNode;
}

export const NoOverflow: React.FC<NoOverflowProps> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};
