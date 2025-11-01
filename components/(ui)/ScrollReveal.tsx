'use client';

import { motion, useAnimationControls, useInView } from 'framer-motion';
import { type ReactNode, useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const referencia = useRef<HTMLDivElement>(null);
  const controles = useAnimationControls();
  const emVisao = useInView(referencia, { once: true, margin: '-100px' });

  useEffect(() => {
    if (emVisao) {
      void controles.start('visivel');
    }
  }, [controles, emVisao]);

  return (
    <motion.div
      ref={referencia}
      className={className}
      initial="oculto"
      animate={controles}
      variants={{
        oculto: { opacity: 0, y: 24 },
        visivel: {
          opacity: 1,
          y: 0,
          transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      }}
    >
      {children}
    </motion.div>
  );
}
