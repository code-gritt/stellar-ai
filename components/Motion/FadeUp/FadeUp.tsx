'use client';

import { motion, useInView, type Variants } from 'motion/react';
import * as React from 'react';

export interface FadeUpProps {
  children: React.ReactNode;
  staggerChildren?: number;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  staggerChildren = 0.1,
}) => {
  const FADE_DOWN: Variants = {
    show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 1 } },
    hidden: { opacity: 0, y: 18 },
  };
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : ''}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
    >
      <motion.div variants={FADE_DOWN}>{children}</motion.div>
    </motion.div>
  );
};

export default FadeUp;
