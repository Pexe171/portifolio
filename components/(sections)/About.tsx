export default function About() {
  return (
    <section id="sobre" className="space-y-6 py-16">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Sobre mim</p>
        <h2 className="font-titulo text-3xl font-semibold">Histórias, processos e valores</h2>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Sou movido por criar produtos digitais que sejam inclusivos e que respeitem o tempo das pessoas. Acredito em
          descobertas profundas, colaboração com equipes multidisciplinares e em transformar problemas complexos em jornadas
          simples e marcantes.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Quando não estou codando, estou estudando storytelling, prototipando ideias ou testando interfaces com usuários reais.
          Meu objetivo é unir tecnologia, design e empatia para entregar resultados que façam sentido.
        </p>
      </div>
    </section>
  );
}
