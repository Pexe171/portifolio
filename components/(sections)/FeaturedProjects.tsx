import Link from 'next/link';
import ProjectCard, { type ProjetoEmDestaque } from '@/components/(ui)/ProjectCard';

const projetos: ProjetoEmDestaque[] = [
  {
    slug: 'cobrador-whatsapp',
    titulo: 'Cobrador WhatsApp',
    descricao: 'Automação amigável para lembrar clientes de pagamentos com mensagens humanas.',
    video: '/videos/cobrador-whatsapp.mp4',
    imagem: '/images/cobrador-whatsapp.png',
    tags: ['Automação', 'Node.js', 'UX Writing']
  },
  {
    slug: 'outro-projeto',
    titulo: 'Outro Projeto Criativo',
    descricao: 'Experiência interativa focada em acessibilidade e storytelling digital.',
    video: '/videos/outro-projeto.mp4',
    imagem: '/images/outro-projeto.png',
    tags: ['Acessibilidade', 'Design System', 'Next.js']
  }
];

export default function FeaturedProjects() {
  return (
    <section id="projetos" className="space-y-2xl py-section">
      <header className="space-y-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-midnight-muted">Projetos</p>
        <h2 className="font-display text-3xl font-semibold text-midnight-text">Estudos de caso que mostram minha forma de pensar</h2>
        <p className="max-w-2xl text-midnight-muted">
          Cada card abaixo é alimentado por um arquivo MDX com o estudo de caso completo. Clique para mergulhar nos detalhes de
          pesquisa, design e código.
        </p>
      </header>

      <div className="grid gap-lg md:grid-cols-2">
        {projetos.map((projeto) => (
          <ProjectCard key={projeto.slug} projeto={projeto} />
        ))}
      </div>

      <div className="text-center">
        <Link href="/" className="text-sm text-midnight-muted transition hover:text-midnight-accent">
          Em breve adicionarei mais cases por aqui ✨
        </Link>
      </div>
    </section>
  );
}
