import type { Config } from 'tailwindcss';

const withOpacityValue = (variable: string) => ({
  opacityValue
}: {
  opacityValue?: string;
}) => {
  if (opacityValue === undefined) {
    return `rgb(var(${variable}))`;
  }

  return `rgb(var(${variable}) / ${opacityValue})`;
};

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
        midnight: {
          bg: withOpacityValue('--color-bg'),
          surface: withOpacityValue('--color-surface'),
          'surface-elevated': withOpacityValue('--color-surface-elevated'),
          stroke: withOpacityValue('--color-stroke'),
          text: withOpacityValue('--color-text'),
          muted: withOpacityValue('--color-muted'),
          accent: withOpacityValue('--color-accent'),
          'accent-strong': withOpacityValue('--color-accent-strong')
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        display: ['var(--font-display)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'Fira Code', 'monospace']
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        section: '6rem'
      },
      maxWidth: {
        content: '68rem',
        layout: '80rem'
      }
    }
  },
  plugins: []
};

export default config;
