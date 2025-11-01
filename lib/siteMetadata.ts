export interface SiteMetadata {
  name: string;
  shortName: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  author: string;
  keywords: string[];
  ogImage?: string;
  twitterHandle: string;
  linkedIn: string;
  github: string;
}

export const siteMetadata: SiteMetadata = {
  name: 'Meu Portfólio',
  shortName: 'Portfólio',
  title: 'Meu Portfólio | Construindo experiências memoráveis',
  description:
    'Portfólio moderno desenvolvido com Next.js, Tailwind CSS e animações suaves para apresentar projetos com carinho.',
  url: 'https://meu-portfolio.dev',
  locale: 'pt_BR',
  author: 'Desenvolvedor Front-end',
  keywords: [
    'portfólio',
    'desenvolvedor front-end',
    'next.js',
    'react',
    'tailwind css',
    'ux',
    'ui',
    'design system',
    'acessibilidade',
    'case de produto'
  ],
  twitterHandle: '@meu_portfolio',
  linkedIn: 'https://www.linkedin.com/in/seu-usuario',
  github: 'https://github.com/seu-usuario'
};
