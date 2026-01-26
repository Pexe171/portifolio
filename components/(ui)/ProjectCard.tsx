'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { ProjetoParaCard } from '@/lib/projetos';

interface ProjectCardProps {
  projeto: ProjetoParaCard;
}

const MotionArticle = motion.article;
const MotionVideo = motion.video;
const MotionDiv = motion.div;

const variantesMidia = {
  rest: { opacity: 1, scale: 1 },
  hover: { opacity: 0, scale: 1.02 }
};

const variantesVideo = {
  rest: { opacity: 0, scale: 1.02 },
  hover: { opacity: 1, scale: 1 }
};

export default function ProjectCard({ projeto }: ProjectCardProps) {
  const [hover, setHover] = useState(false);
  const progresso = useMotionValue(0);
  const largura = useTransform(progresso, (valor) => `${Math.min(valor, 1) * 100}%`);
  const podeMostrarVideo = useMemo(() => {
    if (!projeto.video) {
      return false;
    }

    return /\.mp4($|\?)/.test(projeto.video) || projeto.video.startsWith('/');
  }, [projeto.video]);

  const tagsVisiveis = projeto.tags.slice(0, 4);
  const tagsRestantes = projeto.tags.length - tagsVisiveis.length;

  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight-bg"
    >
      <MotionArticle
        initial="rest"
        animate="rest"
        whileHover="hover"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => {
          setHover(false);
          progresso.set(0);
        }}
        className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-midnight-surface/95 via-midnight-surface/70 to-midnight-bg shadow-[0_24px_80px_-40px_rgba(6,12,24,0.9)] transition will-change-transform hover:-translate-y-2 hover:border-midnight-accent/70 hover:shadow-[0_30px_110px_-45px_rgba(56,189,248,0.45)]"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-midnight-surface">
          <MotionDiv className="absolute inset-0" variants={variantesMidia} transition={{ duration: 0.4, ease: 'easeInOut' }}>
            <Image
              src={projeto.imagem}
              alt={projeto.titulo}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={projeto.ordem === 1}
            />
          </MotionDiv>

          {podeMostrarVideo && (
            <MotionVideo
              key={`${projeto.slug}-video`}
              autoPlay
              loop
              muted
              playsInline
              aria-hidden
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover"
              variants={variantesVideo}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onTimeUpdate={(evento) =>
                progresso.set(evento.currentTarget.currentTime / (evento.currentTarget.duration || 1))
              }
            >
              <source src={projeto.video} type="video/mp4" />
            </MotionVideo>
          )}

          <MotionDiv
            className="absolute inset-0 bg-gradient-to-t from-midnight-bg/95 via-midnight-bg/40 to-transparent"
            animate={{ opacity: hover ? 0.2 : 0.6 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />

          <div className="absolute left-4 top-4 flex items-center gap-xs">
            {projeto.destaque && (
              <span className="rounded-full border border-white/10 bg-white/10 px-sm py-xs text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur">
                Destaque
              </span>
            )}
            <span className="rounded-full border border-white/10 bg-midnight-bg/40 px-sm py-xs text-[0.6rem] uppercase tracking-[0.25em] text-white/70 backdrop-blur">
              Case
            </span>
          </div>

          <div className="absolute right-4 top-4 hidden items-center gap-xs rounded-full border border-white/10 bg-midnight-bg/40 px-sm py-xs text-[0.6rem] uppercase tracking-[0.25em] text-white/70 backdrop-blur transition group-hover:flex">
            Explorar
            <span aria-hidden>↗</span>
          </div>

          <MotionDiv className="absolute bottom-4 left-4 h-1 rounded-full bg-midnight-accent/80" style={{ width: largura }} />
        </div>

        <div className="space-y-lg p-lg">
          <div className="space-y-sm">
            <h3 className="font-display text-2xl font-semibold text-midnight-text transition group-hover:text-white">
              {projeto.titulo}
            </h3>
            <p className="text-sm text-midnight-muted">{projeto.descricao}</p>
          </div>

          <ul className="flex flex-wrap gap-sm text-[0.65rem] font-medium uppercase tracking-[0.2em] text-midnight-muted">
            {tagsVisiveis.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 bg-midnight-bg/40 px-md py-xs">
                {tag}
              </li>
            ))}
            {tagsRestantes > 0 && (
              <li className="rounded-full border border-dashed border-white/10 bg-midnight-bg/20 px-md py-xs text-white/60">
                +{tagsRestantes}
              </li>
            )}
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-sm text-xs font-semibold uppercase tracking-[0.25em] text-midnight-muted">
            <span className="text-white/70">Ver estudo completo</span>
            <span className="inline-flex items-center gap-xs text-midnight-accent">
              Detalhes
              <span aria-hidden className="transition group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </MotionArticle>
    </Link>
  );
}
