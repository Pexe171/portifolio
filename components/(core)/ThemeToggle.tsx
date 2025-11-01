'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

  return (
    <button
      type="button"
      onClick={alternarTema}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-destaque hover:text-destaque dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      aria-label="Alternar tema entre claro e escuro"
    >
      <motion.span key={temaAtual} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
        {temaAtual === 'light' ? '🌞' : '🌙'}
      </motion.span>
    </button>
  );
}
