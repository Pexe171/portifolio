'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useMemo, useRef } from 'react';

export interface EventoTimeline {
  ano: string;
  titulo: string;
  descricao: string;
}

interface TimelineProps {
  eventos: EventoTimeline[];
}

const variantesEvento = {
  oculto: { opacity: 0, y: 32 },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function Timeline({ eventos }: TimelineProps) {
  const containerRef = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });
  const progressoLinha = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const eventosComIndice = useMemo(() => eventos.map((evento, indice) => ({ ...evento, indice })), [eventos]);

  return (
    <div className="relative">
      <motion.span
        className="absolute left-[13px] top-0 h-full w-[2px] origin-top rounded-full bg-midnight-stroke/60 md:left-1/2 md:-translate-x-1/2 md:bg-midnight-accent/40"
        style={{ scaleY: progressoLinha }}
        aria-hidden
      />

      <motion.ol
        ref={containerRef}
        className="relative space-y-2xl md:grid md:grid-cols-[repeat(2,minmax(0,1fr))] md:gap-x-2xl md:gap-y-3xl md:space-y-0"
        initial="oculto"
        whileInView="visivel"
        viewport={{ once: true, amount: 0.35 }}
      >
        {eventosComIndice.map((evento) => {
          const alinhamento = evento.indice % 2 === 0 ? 'md:justify-self-end' : 'md:justify-self-start';

          return (
            <motion.li
              key={evento.titulo}
              variants={variantesEvento}
              className={`relative flex max-w-xl flex-col gap-sm rounded-xl border border-midnight-stroke/60 bg-midnight-surface/80 p-lg backdrop-blur-sm transition md:max-w-none ${alinhamento}`}
            >
              <span
                className="absolute left-[-29px] top-10 hidden h-4 w-4 rounded-full border-2 border-midnight-accent bg-midnight-surface md:block"
                aria-hidden
              />
              <span
                className="absolute -left-[15px] top-6 block h-3 w-3 rounded-full border border-midnight-accent bg-midnight-surface md:hidden"
                aria-hidden
              />

              <time className="text-sm font-semibold uppercase tracking-[0.3em] text-midnight-muted">{evento.ano}</time>
              <h3 className="font-display text-2xl font-semibold text-midnight-text">{evento.titulo}</h3>
              <p className="text-base text-midnight-muted">{evento.descricao}</p>
            </motion.li>
          );
        })}
      </motion.ol>
    </div>
  );
}
