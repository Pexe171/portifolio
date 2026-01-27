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
  name: 'David Henrique',
  shortName: 'David Henrique',
  title: 'David Henrique | Engenharia de Software e back-end',
  description:
    'Portfólio de David Henrique, estudante de Engenharia de Software com foco em desenvolvimento web e back-end, integrações de APIs e automação de rotinas.',
  url: 'https://meu-portfolio.dev',
  locale: 'pt_BR',
  author: 'David Henrique',
  keywords: [
    'portfólio',
    'engenharia de software',
    'desenvolvimento web',
    'back-end',
    'node.js',
    'typescript',
    'apis',
    'automação',
    'next.js',
    'tailwind css'
  ],
  twitterHandle: '@meu_portfolio',
  linkedIn: 'https://br.linkedin.com/in/david-henrique-miranda-da-silva-758666388',
  github: 'https://github.com/seu-usuario'
};
