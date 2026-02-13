import type { Metadata } from 'next';
import Hero from '@/components/(sections)/Hero';
import FeaturedProjects from '@/components/(sections)/FeaturedProjects';
import About from '@/components/(sections)/About';
import Skills from '@/components/(sections)/Skills';
import Process from '@/components/(sections)/Process';
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
    'Portfólio full stack com nova linguagem visual, animações avançadas e estudos de caso orientados a resultado de negócio.',
  openGraph: {
    title: 'Início | David Henrique',
    description:
      'Portfólio premium com frontend animado, arquitetura escalável e projetos full stack em produção.',
    url: '/',
    ...(homeOpenGraphImages ? { images: homeOpenGraphImages } : {})
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Início | David Henrique',
    description:
      'Portfólio premium com frontend animado, arquitetura escalável e projetos full stack em produção.',
    ...(homeTwitterImages ? { images: homeTwitterImages } : {})
  }
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <About />
      <Process />
      <Skills />
      <Experience />
      <Contact />
    </>
  );
}
