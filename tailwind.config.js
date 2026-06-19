// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Sistema CLARO con acento ROJO institucional ──
        // Se conservan los nombres de tokens (primary, base, surface, line, glow)
        // para no tocar las clases existentes en los componentes; solo cambian los valores.
        primary: {
          50:  '#fff1f1',
          100: '#ffdede',
          200: '#ffc2c2',
          300: '#ff9a9a',
          400: '#f5455a', // acento rojo señal
          500: '#e11d3a',
          600: '#c30f2b',
          700: '#a10c24',
          800: '#7e0d20',
          900: '#2a0a12', // texto/superficie muy oscura (uso puntual)
          950: '#1a0509',
        },
        glow: '#ff5a6e',      // brillo rojo (uso muy puntual)
        base: '#ffffff',      // fondo principal (CLARO)
        surface: '#ffffff',   // tarjetas
        soft: '#f6f7fb',      // secciones intercaladas gris muy claro
        ink: '#0f1222',       // texto principal oscuro
        line: '#e7e9f2',      // bordes sutiles
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,18,34,0.04), 0 12px 32px rgba(15,18,34,0.08)',
        lift: '0 18px 50px rgba(225,29,58,0.16)',
        glow: '0 0 0 1px rgba(245,69,90,0.18), 0 8px 40px rgba(245,69,90,0.16)',
      },
      keyframes: {
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
    },
  },
  plugins: [],
};
