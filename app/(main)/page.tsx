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
        width: 617,
        height: 324,
        alt: 'Capa do portfólio destacando sistemas operacionais, CRM e IA aplicada'
      }
    ]
  : undefined;

const homeTwitterImages = siteMetadata.ogImage ? [siteMetadata.ogImage] : undefined;

export const metadata: Metadata = {
  title: 'Início',
  description:
    'Portfólio com foco em CRM, automação operacional, integrações e IA aplicada a produtos reais.',
  openGraph: {
    title: 'Início | David Henrique',
    description:
      'Casos de CRM, e-commerce, RAG e produtos operacionais construídos com arquitetura full-stack.',
    url: '/',
    ...(homeOpenGraphImages ? { images: homeOpenGraphImages } : {})
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Início | David Henrique',
    description:
      'Casos de CRM, e-commerce, RAG e produtos operacionais construídos com arquitetura full-stack.',
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
