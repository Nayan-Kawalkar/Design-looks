import React from 'react';
import { motion } from 'framer-motion';

export const ZoomBlurReveal = ({ children, delay = 0, duration = 0.8, className = '', style = {} }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, filter: 'blur(12px)', y: 30 }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      style={{ willChange: 'transform, opacity, filter', ...style }}
    >
      {children}
    </motion.div>
  );
};

export default ZoomBlurReveal;
