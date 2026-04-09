import { profileLinks } from '@/lib/profile';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/20 py-10 text-sm text-midnight-muted">
      <div className="mx-auto grid max-w-layout gap-8 px-lg md:grid-cols-[1.3fr_1fr_1fr] md:px-xl lg:px-0">
        <div className="space-y-3">
          <p className="font-display text-xl font-semibold text-midnight-text">David Henrique</p>
          <p className="max-w-md leading-7">
            Portfólio construído em Next.js para apresentar cases de CRM, automação operacional, integrações críticas e IA aplicada
            a produto.
          </p>
        </div>

        <div className="space-y-3">
          <p className="eyebrow">Links</p>
          <div className="flex flex-wrap gap-3">
            {profileLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="button-secondary !px-4 !py-2 !text-xs"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3 md:text-right">
          <p className="eyebrow">Entrega</p>
          <p className="leading-7">
            Código, direção visual, estudos de caso e estrutura de conteúdo alinhados para uma leitura de produto mais madura.
          </p>
          <p className="text-xs uppercase tracking-[0.24em] text-midnight-muted/80">
            {new Date().getFullYear()} · all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
