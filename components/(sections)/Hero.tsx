import Link from 'next/link';

export default function Hero() {
  return (
    <section id="inicio" className="flex flex-col gap-6 py-16">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Olá, eu sou</p>
      <h1 className="font-titulo text-4xl font-bold leading-tight md:text-6xl">
        Um desenvolvedor front-end apaixonado por experiências humanas
      </h1>
      <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
        Crio interfaces responsivas, acessíveis e cheias de emoção. Aqui você encontra os projetos que traduzem minha forma de pensar
        produtos digitais: cada detalhe conta uma história.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="#projetos"
          className="rounded-full bg-destaque px-6 py-3 text-sm font-semibold text-white shadow transition hover:brightness-110"
        >
          Ver projetos em destaque
        </Link>
        <Link
          href="#contato"
          className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-destaque hover:text-destaque dark:border-slate-700 dark:text-slate-200"
        >
          Falar comigo
        </Link>
      </div>
    </section>
  );
}
