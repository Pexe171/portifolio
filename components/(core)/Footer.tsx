export default function Footer() {
  return (
    <footer className="mt-3xl border-t border-midnight-stroke/60 py-xl text-sm text-midnight-muted">
      <div className="mx-auto flex max-w-layout flex-col gap-sm px-xl text-center md:flex-row md:items-center md:justify-between md:px-0">
        <p>
          Construído com carinho utilizando <strong className="font-semibold text-midnight-text">Next.js</strong> e{' '}
          <strong className="font-semibold text-midnight-text">Tailwind CSS</strong>.
        </p>
        <p>&copy; {new Date().getFullYear()} — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
