'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Loader.module.css';

interface LoaderProps {
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text = 'Loading...' }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loaderWrapper}>
        {/* Main text */}
        <motion.span
          className={styles.mainText}
          animate={{
            transform: [
              'skewX(0deg) scaleX(1)',
              'skewX(-40deg) scaleX(2)',
              'skewX(0deg) scaleX(1)',
            ],
          }}
          transition={{
            duration: 0.05,
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 2,
            ease: 'linear',
          }}
        >
          {text}
        </motion.span>

        {/* Green glow */}
        <motion.span
          className={styles.glowGreen}
          animate={{
            x: [-2, 4, -3, 1.5, -2],
            y: [-2, 4, -3, 1.5, -2],
            opacity: [0.3, 0.9, 0.4, 0.8, 0.3],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          {text}
        </motion.span>

        {/* Purple glow */}
        <motion.span
          className={styles.glowPurple}
          animate={{
            x: [0, 1, -1.5, 1.5, -1, 0],
            y: [0, -1, 1.5, -0.5, 0],
            opacity: [0.4, 0.8, 0.3, 0.9, 0.4],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        >
          {text}
        </motion.span>
      </div>
    </div>
  );
};
