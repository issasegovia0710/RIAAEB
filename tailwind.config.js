// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Matiz azul — sistema oscuro tecnológico
        primary: {
          50:  '#eaf2ff',
          100: '#d4e4ff',
          200: '#a9c8ff',
          300: '#7ba8ff',
          400: '#4d8dff', // azul señal (acento)
          500: '#2f6bff',
          600: '#1f54e6',
          700: '#1a44bf',
          800: '#16357f',
          900: '#101a30', // superficie elevada
          950: '#0a1224', // superficie base
        },
        glow: '#38e1ff',     // brillo cian (uso muy puntual)
        base: '#070b18',     // fondo principal
        surface: '#0d1426',  // tarjetas
        line: '#1c2742',     // bordes sutiles
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.3), 0 12px 32px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgba(77,141,255,0.25), 0 8px 40px rgba(77,141,255,0.18)',
      },
    },
  },
  plugins: [],
};
