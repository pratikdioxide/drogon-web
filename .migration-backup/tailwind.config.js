/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        flame: {
          50:  '#fff4ed',
          100: '#ffe6d0',
          400: '#ff7a3d',
          500: '#ff5500',
          600: '#e03d00',
          700: '#b82e00',
        },
        ash: {
          900: '#0a0a0b',
          800: '#111114',
          700: '#1a1a1f',
          600: '#242429',
          500: '#2e2e35',
          400: '#45454f',
          300: '#6b6b78',
          200: '#9898a8',
          100: '#c8c8d8',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      }
    },
  },
  plugins: [],
}