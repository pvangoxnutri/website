import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8F7F2',
        sq: {
          dark: '#111111',
          'dark-2': '#1C1C1C',
          pink: '#D98FAB',
          'pink-hover': '#C87A99',
          'pink-light': '#F5E4EC',
          muted: '#908F88',
          'muted-light': '#B8B7B0',
          border: '#E4E2DB',
          light: '#F2F1EC',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.10)',
        'float': '0 12px 48px rgba(0, 0, 0, 0.14)',
        'hero': '0 24px 80px rgba(0, 0, 0, 0.18)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'popup': 'popup 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'backdrop': 'backdropIn 0.25s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popup: {
          '0%':   { opacity: '0', transform: 'scale(0.5) translateY(24px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        backdropIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
