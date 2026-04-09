export interface ProfileLink {
  label: string;
  href: string;
}

export interface Capability {
  code: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  year: string;
  title: string;
  description: string;
}

export const profileLinks: ProfileLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/Pexe171'
  },
  {
    label: 'LinkedIn',
    href: 'https://br.linkedin.com/in/david-henrique-miranda-da-silva-758666388'
  }
];

export const heroSignals = [
  'CRM multi-tenant',
  'IA aplicada a operação',
  'APIs e integrações críticas',
  'Realtime e automação'
];

export const credibilityStats = [
  {
    value: '4',
    label: 'cases principais com estudo técnico publicado'
  },
  {
    value: 'TS + PY',
    label: 'stack principal entre produtos web, automação e IA'
  },
  {
    value: 'B2B',
    label: 'foco em sistemas operacionais, CRM, atendimento e fluxo comercial'
  }
];

export const capabilityGroups: Capability[] = [
  {
    code: 'CRM',
    title: 'Produtos operacionais de CRM',
    description:
      'Desenho fluxos de leads, deals, conversas, permissões e estados internos para produtos que precisam organizar vendas e atendimento.'
  },
  {
    code: 'API',
    title: 'APIs, contratos e integrações',
    description:
      'Estruturo backends com autenticação, filas, webhooks e integrações com WhatsApp, pagamentos, n8n e serviços externos.'
  },
  {
    code: 'IA',
    title: 'RAG, scoring e automação inteligente',
    description:
      'Aplico IA em contextos práticos: recuperação de contexto, priorização de leads, assistentes internos e pipelines guiados por documentos.'
  },
  {
    code: 'RT',
    title: 'Tempo real e fluxo orientado a eventos',
    description:
      'Uso sockets, filas e processamento assíncrono para manter interfaces operacionais responsivas sem travar a aplicação principal.'
  },
  {
    code: 'UX',
    title: 'Frontend de produto com leitura operacional',
    description:
      'Traduzo sistemas densos em interfaces claras, com hierarquia visual forte, estados previsíveis e foco no que o operador precisa decidir.'
  },
  {
    code: 'OPS',
    title: 'Infra de desenvolvimento e entrega',
    description:
      'Trabalho com monorepo, Docker, documentação viva e pipelines previsíveis para que a aplicação evolua sem virar custo oculto.'
  }
];

export const operationPrinciples = [
  'Eu começo pelo fluxo real do negócio, não pela tela isolada.',
  'Prefiro contratos claros, estados explícitos e arquitetura que aguenta crescer.',
  'Quando a interface é operacional, cada componente precisa ajudar a decidir ou agir.'
];

export const processSteps: ProcessStep[] = [
  {
    year: '01',
    title: 'Entendimento do fluxo crítico',
    description:
      'Mapeio a operação, os atores e onde a fricção realmente acontece antes de propor estrutura técnica ou visual.'
  },
  {
    year: '02',
    title: 'Arquitetura e contratos',
    description:
      'Defino módulos, persistência, integrações, eventos e fronteiras de responsabilidade para o produto evoluir sem retrabalho estrutural.'
  },
  {
    year: '03',
    title: 'Interface operacional',
    description:
      'Construo a camada visual para leitura rápida, ações frequentes e feedbacks claros, especialmente em produtos com dados e filas.'
  },
  {
    year: '04',
    title: 'Entrega e iteração',
    description:
      'Valido a experiência completa com documentação, QA e ajustes orientados ao uso real, não só ao layout.'
  }
];
