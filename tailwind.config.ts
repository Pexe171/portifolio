import type { Config } from 'tailwindcss';

const withOpacityValue = (variable: string) =>
  `rgb(var(${variable}) / <alpha-value>)`;

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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        glow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        'float-slow': 'float 12s ease-in-out infinite',
        glow: 'glow 7s ease-in-out infinite',
        shimmer: 'shimmer 10s ease infinite'
      }
    }
  },
  plugins: []
};

export default config;
