export default function About() {
  return (
    <section id="sobre" className="space-y-lg py-section">
      <header className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Sobre mim</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Histórias, processos e valores</h2>
      </header>
      <div className="grid gap-lg md:grid-cols-2">
        <p className="text-lg text-midnight-muted">
          Sou movido por criar produtos digitais que sejam inclusivos e que respeitem o tempo das pessoas. Acredito em
          descobertas profundas, colaboração com equipes multidisciplinares e em transformar problemas complexos em jornadas
          simples e marcantes.
        </p>
        <p className="text-lg text-midnight-muted">
          Quando não estou codando, estou estudando storytelling, prototipando ideias ou testando interfaces com usuários reais.
          Meu objetivo é unir tecnologia, design e empatia para entregar resultados que façam sentido.
        </p>
      </div>
    </section>
  );
}
