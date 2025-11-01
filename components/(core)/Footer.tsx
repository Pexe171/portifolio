const redes = [
  {
    href: 'https://br.linkedin.com/in/david-henrique-miranda-da-silva-758666388',
    rotulo: 'LinkedIn',
    Icone: () => (
      <svg
        aria-hidden="true"
        focusable="false"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.28h4.56V24H.22zM8.76 8.28h4.38v2.14h.06c.61-1.15 2.11-2.36 4.35-2.36 4.65 0 5.5 3.06 5.5 7.03V24h-4.56v-7.32c0-1.75-.03-4-2.44-4-2.44 0-2.82 1.9-2.82 3.86V24H8.76z" />
      </svg>
    )
  },
  {
    href: 'https://github.com/seu-usuario',
    rotulo: 'GitHub',
    Icone: () => (
      <svg
        aria-hidden="true"
        focusable="false"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.12.82-.26.82-.58v-2c-3.34.73-4-1.61-4-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.1-.77.09-.76.09-.76 1.22.09 1.86 1.25 1.86 1.25 1.08 1.85 2.84 1.32 3.54 1 .11-.79.42-1.32.76-1.62-2.66-.3-5.47-1.34-5.47-5.95 0-1.32.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.28 11.28 0 0 1 6 0c2.3-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.62-2.82 5.64-5.5 5.93.43.37.82 1.1.82 2.23v3.3c0 .32.21.7.83.58A12 12 0 0 0 12 .5" />
      </svg>
    )
  }
];

export default function Footer() {
  return (
    <footer className="mt-3xl border-t border-midnight-stroke/60 py-xl text-sm text-midnight-muted">
      <div className="mx-auto flex max-w-layout flex-col gap-sm px-xl text-center md:flex-row md:items-center md:justify-between md:px-0">
        <p>
          Construído com carinho utilizando <strong className="font-semibold text-midnight-text">Next.js</strong> e{' '}
          <strong className="font-semibold text-midnight-text">Tailwind CSS</strong>.
        </p>
        <div className="flex items-center justify-center gap-md">
          {redes.map(({ href, rotulo, Icone }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-xs rounded-full border border-transparent px-sm py-xs text-midnight-muted transition hover:border-midnight-accent/60 hover:bg-midnight-surface hover:text-midnight-accent focus:outline-none focus:ring-2 focus:ring-midnight-accent/70 focus:ring-offset-2 focus:ring-offset-midnight-bg"
              aria-label={`Abrir ${rotulo} em nova aba`}
            >
              <Icone />
              <span className="hidden text-sm font-medium md:inline">{rotulo}</span>
            </a>
          ))}
        </div>
        <p>&copy; {new Date().getFullYear()} — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
