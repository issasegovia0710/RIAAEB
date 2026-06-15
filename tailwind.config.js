// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Matiz azul — sistema institucional INVESTIGADORES
        primary: {
          50:  '#eef4ff',
          100: '#dbe6ff',
          200: '#bcd2ff',
          300: '#8fb4ff',
          400: '#5b8bff',
          500: '#2f6bff', // azul señal (acento principal)
          600: '#1a4fe6',
          700: '#163fc0',
          800: '#16379b',
          900: '#0a2540', // tinta profunda (fondos oscuros)
          950: '#06182b',
        },
        accent: '#2f6bff',
        ink: '#0a2540',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,37,64,0.06), 0 8px 24px rgba(10,37,64,0.06)',
        lift: '0 12px 40px rgba(10,37,64,0.14)',
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};
