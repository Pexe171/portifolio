'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ProjetoParaCard } from '@/lib/projetos';

interface ProjectCardProps {
  projeto: ProjetoParaCard;
}

const MotionArticle = motion.article;

export default function ProjectCard({ projeto }: ProjectCardProps) {
  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-midnight-accent/70"
    >
      <MotionArticle
        whileHover={{ y: -8 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="section-shell h-full overflow-hidden"
      >
        <div className="relative aspect-[1.22/1] overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(52,211,235,0.16),_transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_38%,rgba(52,211,235,0.08))]" />
          <Image
            src={projeto.imagem}
            alt={projeto.titulo}
            fill
            className="object-contain object-center p-5 transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02] sm:p-7"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={projeto.ordem === 1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-bg via-midnight-bg/18 to-transparent" />
          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {projeto.year && <span className="pill">{projeto.year}</span>}
            {projeto.status && <span className="pill">{projeto.status}</span>}
          </div>
          <div className="absolute bottom-5 left-5 right-5">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-midnight-accent">{projeto.highlight}</p>
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-midnight-muted">
              {projeto.role && <span>{projeto.role}</span>}
              {projeto.repoUrl && <span>repo disponível</span>}
            </div>
            <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-midnight-text">{projeto.titulo}</h3>
            <p className="text-base leading-8 text-midnight-muted">{projeto.resumo}</p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {projeto.tags.slice(0, 4).map((tag) => (
              <li key={tag} className="pill !px-3 !py-2 !tracking-[0.22em]">
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between text-sm font-medium text-midnight-muted">
            <span className="transition group-hover:text-midnight-text">Abrir estudo completo</span>
            <span className="font-display text-lg text-midnight-accent transition group-hover:translate-x-1">→</span>
          </div>
        </div>
      </MotionArticle>
    </Link>
  );
}
