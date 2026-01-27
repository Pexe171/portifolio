'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

type LinkNavegacao = {
  href: string;
  rotulo: string;
};

const links: LinkNavegacao[] = [
  { href: '/', rotulo: 'Início' },
  { href: '/#projetos', rotulo: 'Projetos' },
  { href: '/#sobre', rotulo: 'Sobre' },
  { href: '/#habilidades', rotulo: 'Skills' },
  { href: '/#experiencias', rotulo: 'Experiências' },
  { href: '/#visitantes', rotulo: 'Visitantes' },
  { href: '/#contato', rotulo: 'Contato' }
];

export default function Navbar() {
  const pathname = usePathname();
  const [hashAtivo, setHashAtivo] = useState('');

  useEffect(() => {
    const atualizarHash = () => {
      if (typeof window === 'undefined') return;
      setHashAtivo(window.location.hash);
    };

    atualizarHash();
    window.addEventListener('hashchange', atualizarHash);

    return () => {
      window.removeEventListener('hashchange', atualizarHash);
    };
  }, []);

  const linkEstaAtivo = (href: string) => {
    if (href === '/' && pathname === '/' && !hashAtivo) {
      return true;
    }

    if (href.includes('#')) {
      const hashDoLink = href.slice(href.indexOf('#'));
      return pathname === '/' && hashAtivo === hashDoLink;
    }

    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-midnight-stroke/50 bg-midnight-bg/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-layout items-center justify-between px-xl py-md lg:px-0"
        aria-label="Seções principais do portfólio"
      >
        <Link href="/" className="group inline-flex items-center gap-sm font-display text-lg font-semibold text-midnight-text">
          <span className="relative">
            David
            <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-midnight-accent transition duration-300 group-hover:scale-x-100" />
          </span>
          <span className="rounded-full border border-midnight-stroke/60 bg-midnight-surface/60 px-sm py-xs text-[0.6rem] uppercase tracking-[0.3em] text-midnight-muted">
            Portfolio
          </span>
        </Link>
        <div className="flex items-center gap-lg">
          <ul className="hidden items-center gap-md text-xs font-semibold uppercase tracking-[0.25em] text-midnight-muted md:flex">
            {links.map((link) => {
              const ativo = linkEstaAtivo(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative rounded-full px-md py-xs transition hover:text-midnight-text focus:outline-none focus:ring-2 focus:ring-midnight-accent/70 focus:ring-offset-2 focus:ring-offset-midnight-bg ${
                      ativo ? 'text-midnight-text' : ''
                    }`}
                    aria-current={ativo ? 'page' : undefined}
                  >
                    <span className="relative z-10">{link.rotulo}</span>
                    <span
                      className={`absolute inset-0 rounded-full border transition ${
                        ativo ? 'border-midnight-accent/80 bg-midnight-accent/10' : 'border-transparent'
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
