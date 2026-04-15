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
        black: '#080807',
        deep: '#111110',
        iron: '#1a1918',
        soot: '#252321',
        mid: '#3a3835',
        ash: '#6a6764',
        stone: '#9a9794',
        chalk: '#c8c4be',
        bone: '#e2ddd7',
        white: '#f0ebe4',
        accent: '#b5651d',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'Georgia', 'serif'],
        crimson: ['var(--font-crimson)', 'Georgia', 'serif'],
      },
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

export default config
