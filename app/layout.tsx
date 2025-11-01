import type { Metadata } from 'next';
import { Fira_Code, Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/(core)/Navbar';
import Footer from '@/components/(core)/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap', variable: '--font-mono' });

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
