import type { Metadata } from 'next';
import { Fira_Code, Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/(core)/Navbar';
import Footer from '@/components/(core)/Footer';
import { siteMetadata } from '@/lib/siteMetadata';

const defaultOpenGraphImages = siteMetadata.ogImage
  ? [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 630,
        alt: 'Capa do portfólio destacando experiências digitais com propósito'
      }
    ]
  : undefined;

const defaultTwitterImages = siteMetadata.ogImage ? [siteMetadata.ogImage] : undefined;

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--font-mono' });

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans min-h-screen bg-midnight-bg text-midnight-text transition-colors duration-300`}>
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-layout px-xl py-2xl lg:px-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
