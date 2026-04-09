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

const resolvedSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000');

export const siteMetadata: SiteMetadata = {
  name: 'David Henrique',
  shortName: 'David Henrique',
  title: 'David Henrique | Full-stack CRM, automação e IA aplicada',
  description:
    'Portfólio de David Henrique com foco em sistemas CRM, automação operacional, integrações críticas e produtos com IA aplicada.',
  url: resolvedSiteUrl,
  locale: 'pt_BR',
  author: 'David Henrique',
  keywords: [
    'portfólio',
    'full-stack',
    'crm',
    'automação',
    'inteligência artificial',
    'engenharia de software',
    'back-end',
    'node.js',
    'typescript',
    'python',
    'next.js',
    'nestjs',
    'apis'
  ],
  ogImage: '/images/og-portfolio-canva.png',
  twitterHandle: '@Pexe171',
  linkedIn: 'https://br.linkedin.com/in/david-henrique-miranda-da-silva-758666388',
  github: 'https://github.com/Pexe171'
};
