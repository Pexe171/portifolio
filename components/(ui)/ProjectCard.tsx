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

  return (
    <Link href={`/projetos/${projeto.slug}`} className="group block">
      <MotionArticle
        initial="rest"
        animate="rest"
        whileHover="hover"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => {
          setHover(false);
          progresso.set(0);
        }}
        className="overflow-hidden rounded-3xl border border-midnight-stroke bg-midnight-surface shadow-sm transition will-change-transform hover:-translate-y-2 hover:border-midnight-accent hover:shadow-xl"
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
            className="absolute inset-0 bg-midnight-bg/80"
            animate={{ opacity: hover ? 0.2 : 0.45 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
          <MotionDiv className="absolute bottom-4 left-4 h-1 rounded-full bg-midnight-accent" style={{ width: largura }} />
        </div>

        <div className="space-y-md p-lg">
          <div className="space-y-sm">
            <h3 className="font-display text-2xl font-semibold text-midnight-text">{projeto.titulo}</h3>
            <p className="text-sm text-midnight-muted">{projeto.descricao}</p>
          </div>

          <ul className="flex flex-wrap gap-sm text-xs font-medium uppercase tracking-wide text-midnight-muted">
            {projeto.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-midnight-stroke/60 px-md py-xs">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </MotionArticle>
    </Link>
  );
}
