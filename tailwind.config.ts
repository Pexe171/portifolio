import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        fundo: {
          claro: '#f5f5f5',
          escuro: '#0f172a'
        },
        destaque: '#6366f1'
      },
      fontFamily: {
        titulo: ['var(--fonte-titulo)', 'sans-serif'],
        texto: ['var(--fonte-texto)', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
