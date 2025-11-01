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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-fundo-escuro/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-0">
        <Link href="/" className="font-titulo text-lg font-semibold">
          Meu Portfólio
        </Link>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-4 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition hover:text-destaque ${pathname === link.href ? 'text-destaque' : ''}`}
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
