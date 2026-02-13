export interface MetricaHero {
  rotulo: string;
  valor: string;
}

export const frasesHero = [
  'Plataformas full stack com foco em crescimento sustentável.',
  'APIs resilientes para operações críticas e times escaláveis.',
  'Experiências digitais com animações fluidas e design estratégico.'
];

export const metricasHero: MetricaHero[] = [
  { rotulo: 'Projetos publicados', valor: '08+' },
  { rotulo: 'Stacks dominadas', valor: '12+' },
  { rotulo: 'Tempo de resposta', valor: '< 24h' }
];

export const pilaresSobre = [
  'Arquitetura orientada a domínio para facilitar evolução do produto.',
  'Código limpo com foco em legibilidade, métricas e manutenção de longo prazo.',
  'Design de interface com microinterações e narrativa visual coerente.'
];

export const trilhasSkills = [
  {
    titulo: 'Frontend Engineering',
    resumo: 'Interfaces modernas orientadas a performance, acessibilidade e escalabilidade.',
    stacks: ['Next.js 14', 'TypeScript', 'Tailwind', 'Framer Motion']
  },
  {
    titulo: 'Backend & Integrações',
    resumo: 'Serviços robustos com contratos claros, autenticação segura e automação de processos.',
    stacks: ['Node.js', 'REST APIs', 'JWT', 'Webhooks']
  },
  {
    titulo: 'Dados & Operação',
    resumo: 'Estruturas resilientes para dados, monitoramento e deploy contínuo em nuvem.',
    stacks: ['MongoDB', 'Docker', 'CI/CD', 'AWS Amplify']
  }
];

export const etapasProcesso = [
  {
    etapa: 'Descoberta',
    descricao: 'Entendimento do problema, metas de negócio, restrições técnicas e definição de indicadores de sucesso.'
  },
  {
    etapa: 'Arquitetura',
    descricao: 'Modelagem da solução com contratos claros de API, componentização e estratégia de evolução incremental.'
  },
  {
    etapa: 'Entrega',
    descricao: 'Implementação full stack, testes, observabilidade e pipeline de deploy para produção com segurança.'
  },
  {
    etapa: 'Evolução contínua',
    descricao: 'Medição de resultado, coleta de feedback real e ciclos de melhoria para crescimento sustentável.'
  }
];
