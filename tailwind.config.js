/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F7F5F0',
          light: '#FCFBF9',
          dark: '#EFECE3',
          border: 'rgba(15, 17, 20, 0.14)',
        },
        ink: {
          DEFAULT: '#0E0F12',
          deep: '#070709',
          muted: '#5A5E67',
          faint: '#8E939D',
        },
        accent: {
          gold: '#C59E3F',
          amber: '#B8860B',
        },
        surface: {
          dark: '#0A0B0E',
          darker: '#050607',
          panel: '#121418',
        }
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        headline: ['"Syne"', '"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        luxury: ['"Cinzel"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'superwide': '0.25em',
        'ultrawide': '0.35em',
      },
      borderWidth: {
        'hairline': '1px',
      }
    },
  },
  plugins: [],
}
