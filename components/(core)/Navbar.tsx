'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', rotulo: 'Início' },
  { href: '#projetos', rotulo: 'Projetos' },
  { href: '#sobre', rotulo: 'Sobre' },
  { href: '#habilidades', rotulo: 'Skills' },
  { href: '#experiencias', rotulo: 'Experiências' },
  { href: '#contato', rotulo: 'Contato' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-midnight-stroke/60 bg-midnight-surface/90 backdrop-blur">
      <nav className="mx-auto flex max-w-layout items-center justify-between px-xl py-md lg:px-0">
        <Link href="/" className="font-display text-lg font-semibold text-midnight-text">
          Meu Portfólio
        </Link>
        <div className="flex items-center gap-lg">
          <ul className="hidden items-center gap-md text-sm font-medium text-midnight-muted md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition hover:text-midnight-accent ${pathname === link.href ? 'text-midnight-accent' : ''}`}
                >
                  {link.rotulo}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
