'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavigationLink = {
  href: string;
  label: string;
};

const links: NavigationLink[] = [
  { href: '/', label: 'Início' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#contato', label: 'Contato' }
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (link: NavigationLink) => {
    if (link.href === '/') {
      return pathname === '/';
    }

    if (link.href.startsWith('/#projetos')) {
      return pathname === '/' || pathname.startsWith('/projetos');
    }

    return pathname === '/';
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight-bg/75 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-layout items-center justify-between px-lg py-4 md:px-xl lg:px-0">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-full border border-midnight-accent/25 bg-midnight-accent/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-midnight-accent">
            Full-stack
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-semibold tracking-[-0.03em] text-midnight-text">David Henrique</span>
            <span className="text-xs uppercase tracking-[0.22em] text-midnight-muted">CRM, automação e IA aplicada</span>
          </div>
        </Link>

        <ul className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active = isActive(link);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? 'bg-white/[0.06] text-midnight-text'
                      : 'text-midnight-muted hover:bg-white/[0.04] hover:text-midnight-text'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
