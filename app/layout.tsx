import type { Metadata } from 'next';
import { Fira_Code, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/(core)/Navbar';
import Footer from '@/components/(core)/Footer';
import { siteMetadata } from '@/lib/siteMetadata';

const defaultOpenGraphImages = siteMetadata.ogImage
  ? [
      {
        url: siteMetadata.ogImage,
        width: 617,
        height: 324,
        alt: 'Capa do portfólio destacando sistemas operacionais, CRM e IA aplicada'
      }
    ]
  : undefined;

const defaultTwitterImages = siteMetadata.ogImage ? [siteMetadata.ogImage] : undefined;

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-sans'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-display'
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author, url: siteMetadata.linkedIn }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  alternates: {
    canonical: siteMetadata.url
  },
  openGraph: {
    type: 'website',
    locale: siteMetadata.locale,
    url: siteMetadata.url,
    title: siteMetadata.title,
    siteName: siteMetadata.name,
    description: siteMetadata.description,
    images: defaultOpenGraphImages
  },
  twitter: {
    card: 'summary_large_image',
    site: siteMetadata.twitterHandle,
    creator: siteMetadata.twitterHandle,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: defaultTwitterImages
  },
  robots: {
    index: true,
    follow: true
  },
  category: 'technology'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${plexSans.variable} ${spaceGrotesk.variable} ${firaCode.variable} min-h-screen bg-midnight-bg font-sans text-midnight-text`}
      >
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-layout px-lg py-2xl md:px-xl lg:px-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
