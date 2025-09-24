'use client';

import { animate, ValueAnimationTransition } from 'motion/react';
import { useMotionValue, useTransform, motion } from 'motion/react';
import { useEffect } from 'react';

export interface NumberUpProps {
  isInView: boolean;
  number: number;
  transition: ValueAnimationTransition;
}

export const NumberUp: React.FC<NumberUpProps> = ({
  isInView,
  number,
  transition,
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, number, transition);

      return () => controls.stop();
    }
  }, [isInView]);

  return <motion.span>{rounded}</motion.span>;
};
