'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export interface TypingTextProps {
  children: string;
}

export const TypingText: React.FC<TypingTextProps> = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      {props.children.split('').map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.2, delay: index * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </div>
  );
};

export default TypingText;
