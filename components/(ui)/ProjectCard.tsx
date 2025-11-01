'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

export interface ProjetoEmDestaque {
  slug: string;
  titulo: string;
  descricao: string;
  video: string;
  imagem: string;
  tags: string[];
}

interface ProjectCardProps {
  projeto: ProjetoEmDestaque;
}

export default function ProjectCard({ projeto }: ProjectCardProps) {
  const [hover, setHover] = useState(false);
  const progresso = useMotionValue(0);
  const largura = useTransform(progresso, (valor) => `${Math.min(valor, 1) * 100}%`);

  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-2 hover:border-destaque hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        progresso.set(0);
      }}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        {hover ? (
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full object-cover"
            onTimeUpdate={(evento) => progresso.set(evento.currentTarget.currentTime / (evento.currentTarget.duration || 1))}
          >
            <source src={projeto.video} type="video/mp4" />
          </motion.video>
        ) : (
          <Image src={projeto.imagem} alt={projeto.titulo} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
        )}
        <motion.div
          className="absolute inset-0 bg-slate-950/70"
          animate={{ opacity: hover ? 0.2 : 0.4 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div className="absolute bottom-4 left-4 h-1 rounded-full bg-destaque" style={{ width: largura }} />
      </div>

      <div className="space-y-4 p-6">
        <div className="space-y-2">
          <h3 className="font-titulo text-2xl font-semibold text-slate-900 dark:text-white">{projeto.titulo}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{projeto.descricao}</p>
        </div>

        <ul className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {projeto.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-slate-200 px-3 py-1 dark:border-slate-700">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
