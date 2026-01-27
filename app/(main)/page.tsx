import type { Metadata } from 'next';
import Hero from '@/components/(sections)/Hero';
import FeaturedProjects from '@/components/(sections)/FeaturedProjects';
import About from '@/components/(sections)/About';
import Skills from '@/components/(sections)/Skills';
import Experience from '@/components/(sections)/Experience';
import Contact from '@/components/(sections)/Contact';
import { siteMetadata } from '@/lib/siteMetadata';

const homeOpenGraphImages = siteMetadata.ogImage
  ? [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Capa do portfólio destacando experiências digitais com propósito'
      }
    ]
  : undefined;

const homeTwitterImages = siteMetadata.ogImage ? [siteMetadata.ogImage] : undefined;

export const metadata: Metadata = {
  title: 'Início | David Henrique',
  description:
    'Estudante de Engenharia de Software focado em desenvolvimento web e back-end. Conheça integrações com APIs, automações e projetos construídos com cuidado.',
  openGraph: {
    title: 'Início | David Henrique',
    description:
      'Portfólio com estudos de caso sobre APIs, Node.js e automação de rotinas para gerar impacto em produtos digitais.',
    url: '/',
    ...(homeOpenGraphImages ? { images: homeOpenGraphImages } : {})
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Início | David Henrique',
    description:
      'Portfólio com estudos de caso sobre APIs, Node.js e automação de rotinas para gerar impacto em produtos digitais.',
    ...(homeTwitterImages ? { images: homeTwitterImages } : {})
  }
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
