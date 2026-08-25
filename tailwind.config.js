/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        darkBg: '#09090B',
        darkCard: '#121215',
        accentBlue: '#3B82F6',
      },
      keyframes: {
        vinylSpin: {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'vinyl-spin': 'vinylSpin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
