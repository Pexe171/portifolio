'use client';

import { motion } from 'framer-motion';
import { etapasProcesso } from '@/lib/homeContent';

export default function Process() {
  return (
    <section id="processo" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-midnight-muted">Processo</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text md:text-4xl">Como eu transformo ideia em produto</h2>
      </header>

      <div className="grid gap-md lg:grid-cols-2">
        {etapasProcesso.map((item, index) => (
          <motion.article
            key={item.etapa}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
            className="group rounded-3xl border border-midnight-stroke/60 bg-gradient-to-br from-midnight-surface/80 to-midnight-bg p-lg"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-midnight-muted">Etapa {String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-sm text-xl font-semibold text-midnight-text">{item.etapa}</h3>
            <p className="mt-sm text-sm text-midnight-muted">{item.descricao}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
