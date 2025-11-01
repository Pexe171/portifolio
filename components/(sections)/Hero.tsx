import Link from 'next/link';

export default function Hero() {
  return (
    <section id="inicio" className="flex flex-col gap-lg py-section">
      <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Olá, eu sou</p>
      <h1 className="font-display text-4xl font-bold leading-tight text-midnight-text md:text-6xl">
        Um desenvolvedor front-end apaixonado por experiências humanas
      </h1>
      <p className="max-w-2xl text-lg text-midnight-muted">
        Crio interfaces responsivas, acessíveis e cheias de emoção. Aqui você encontra os projetos que traduzem minha forma de pensar
        produtos digitais: cada detalhe conta uma história.
      </p>
      <div className="flex flex-wrap gap-md">
        <Link
          href="#projetos"
          className="rounded-full bg-midnight-accent px-lg py-sm text-sm font-semibold text-midnight-bg shadow transition hover:bg-midnight-accent-strong"
        >
          Ver projetos em destaque
        </Link>
        <Link
          href="#contato"
          className="rounded-full border border-midnight-stroke px-lg py-sm text-sm font-semibold text-midnight-text transition hover:border-midnight-accent hover:text-midnight-accent"
        >
          Falar comigo
        </Link>
      </div>
    </section>
  );
}
