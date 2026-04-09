'use client';

import { motion } from 'framer-motion';
import { capabilityGroups } from '@/lib/profile';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' }
  }
};

export default function Skills() {
  return (
    <section className="space-y-8 py-24">
      <header className="space-y-4">
        <p className="eyebrow">Capacidades</p>
        <h2 className="section-heading">As áreas em que eu agrego mais valor técnico hoje.</h2>
        <p className="section-copy">
          Meu recorte principal está em produto B2B, integração entre sistemas e software que precisa aguentar operação real sem
          virar caos.
        </p>
      </header>

      <motion.ul
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {capabilityGroups.map((capability) => (
          <motion.li key={capability.title} variants={itemVariants} className="section-shell p-6">
            <span className="pill">{capability.code}</span>
            <h3 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-midnight-text">
              {capability.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-midnight-muted">{capability.description}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
