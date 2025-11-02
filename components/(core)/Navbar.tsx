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
  { href: '#projetos', rotulo: 'Projetos' },
  { href: '#sobre', rotulo: 'Sobre' },
  { href: '#habilidades', rotulo: 'Skills' },
  { href: '#experiencias', rotulo: 'Experiências' },
  { href: '#contato', rotulo: 'Contato' }
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

    if (href.startsWith('#')) {
      return hashAtivo === href;
    }

    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-midnight-stroke/60 bg-midnight-surface/90 backdrop-blur">
      <nav
        className="mx-auto flex max-w-layout items-center justify-between px-xl py-md lg:px-0"
        aria-label="Seções principais do portfólio"
      >
        <Link href="/" className="font-display text-lg font-semibold text-midnight-text">
          David
        </Link>
        <div className="flex items-center gap-lg">
          <ul className="hidden items-center gap-md text-sm font-medium text-midnight-muted md:flex">
            {links.map((link) => {
              const ativo = linkEstaAtivo(link.href);
              const destino = link.href.startsWith('#') ? `/${link.href}` : link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={destino}
                    className={`rounded-md px-sm py-xs transition hover:text-midnight-accent focus:outline-none focus:ring-2 focus:ring-midnight-accent/70 focus:ring-offset-2 focus:ring-offset-midnight-surface ${
                      ativo ? 'text-midnight-accent' : ''
                    }`}
                    aria-current={ativo ? 'page' : undefined}
                  >
                    {link.rotulo}
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
