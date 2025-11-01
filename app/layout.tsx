import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/(core)/Navbar';
import Footer from '@/components/(core)/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--fonte-texto' });

export const metadata: Metadata = {
  title: 'Meu Portfólio | Construindo experiências memoráveis',
  description: 'Portfólio moderno desenvolvido com Next.js, Tailwind CSS e animações suaves para apresentar projetos com carinho.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-texto min-h-screen bg-fundo-claro text-slate-900 transition-colors duration-300 dark:bg-fundo-escuro dark:text-slate-100`}>
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-5xl px-6 py-10 lg:px-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
