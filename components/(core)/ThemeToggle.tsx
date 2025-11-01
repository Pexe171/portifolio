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
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-midnight-stroke bg-midnight-surface text-midnight-muted transition hover:border-midnight-accent hover:text-midnight-accent"
      aria-label="Alternar tema entre claro e escuro"
    >
      <motion.span key={temaAtual} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }}>
        {temaAtual === 'light' ? '🌞' : '🌙'}
      </motion.span>
    </button>
  );
}
