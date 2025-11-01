'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type IconeProps = {
  className?: string;
};

function SolIcone({ className }: IconeProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 6.07-1.42-1.42M8.35 8.35 6.93 6.93m0 10.14 1.42-1.42m9.32-9.32 1.42-1.42" />
    </svg>
  );
}

function LuaIcone({ className }: IconeProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10" aria-hidden />;
  }

  const temaAtual = resolvedTheme ?? theme ?? 'light';

  const alternarTema = () => {
    setTheme(temaAtual === 'light' ? 'dark' : 'light');
  };

  const estaNoTemaEscuro = temaAtual === 'dark';

  return (
    <button
      type="button"
      onClick={alternarTema}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-midnight-stroke bg-midnight-surface text-midnight-muted transition hover:border-midnight-accent hover:text-midnight-accent focus:outline-none focus:ring-2 focus:ring-midnight-accent/70 focus:ring-offset-2 focus:ring-offset-midnight-surface"
      aria-label={`Alternar para o tema ${estaNoTemaEscuro ? 'claro' : 'escuro'}`}
      aria-pressed={estaNoTemaEscuro}
    >
      <motion.span
        key={temaAtual}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex"
      >
        {estaNoTemaEscuro ? <LuaIcone className="h-5 w-5" /> : <SolIcone className="h-5 w-5" />}
      </motion.span>
    </button>
  );
}
