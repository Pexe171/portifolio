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
  title: 'Início',
  description:
    'Portfólio que combina estratégia, design e desenvolvimento front-end para entregar experiências memoráveis em produtos digitais.',
  openGraph: {
    title: 'Início | Meu Portfólio',
    description:
      'Conheça projetos, processos e resultados que conectam tecnologia, design e empatia para gerar impacto real.',
    url: '/',
    ...(homeOpenGraphImages ? { images: homeOpenGraphImages } : {})
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Início | Meu Portfólio',
    description:
      'Conheça projetos, processos e resultados que conectam tecnologia, design e empatia para gerar impacto real.',
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
