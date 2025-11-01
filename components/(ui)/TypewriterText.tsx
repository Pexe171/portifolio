'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface TypewriterTextProps {
  frases: string[];
  className?: string;
  velocidadeDigitacao?: number;
  pausaEntreFrases?: number;
}

const CURSOR_CLASSES =
  'relative inline-flex min-h-[1.5em] items-center after:absolute after:-bottom-1 after:right-[-0.15em] after:h-[1.3em] after:w-[2px] after:animate-pulse after:bg-midnight-accent';

export default function TypewriterText({
  frases,
  className,
  velocidadeDigitacao = 60,
  pausaEntreFrases = 2200
}: TypewriterTextProps) {
  const frasesValidas = useMemo(() => frases.filter((frase) => frase.trim().length > 0), [frases]);
  const [indiceFrase, definirIndiceFrase] = useState(0);
  const [textoVisivel, definirTextoVisivel] = useState('');
  const [apagando, definirApagando] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (frasesValidas.length === 0) {
      definirTextoVisivel('');
      return;
    }

    const fraseAtual = frasesValidas[indiceFrase % frasesValidas.length];
    const atrasoPadrao = apagando ? velocidadeDigitacao / 2 : velocidadeDigitacao;
    const atraso = !apagando && textoVisivel === fraseAtual ? pausaEntreFrases : atrasoPadrao;

    timeoutRef.current = setTimeout(() => {
      if (!apagando && textoVisivel === fraseAtual) {
        definirApagando(true);
        return;
      }

      if (apagando && textoVisivel.length === 0) {
        definirApagando(false);
        definirIndiceFrase((indice) => (indice + 1) % frasesValidas.length);
        return;
      }

      const proximoComprimento = textoVisivel.length + (apagando ? -1 : 1);
      const proximoTexto = fraseAtual.slice(0, Math.max(0, proximoComprimento));
      definirTextoVisivel(proximoTexto);
    }, atraso);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [apagando, frasesValidas, indiceFrase, pausaEntreFrases, textoVisivel, velocidadeDigitacao]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const classesCombinadas = className ? `${CURSOR_CLASSES} ${className}` : CURSOR_CLASSES;

  return (
    <span className={classesCombinadas} aria-live="polite" aria-label={textoVisivel}>
      {textoVisivel}
    </span>
  );
}
