export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 py-8 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 text-center md:flex-row md:items-center md:justify-between md:px-0">
        <p>
          Construído com carinho utilizando <strong className="font-semibold text-slate-700 dark:text-slate-200">Next.js</strong> e{' '}
          <strong className="font-semibold text-slate-700 dark:text-slate-200">Tailwind CSS</strong>.
        </p>
        <p>&copy; {new Date().getFullYear()} — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
