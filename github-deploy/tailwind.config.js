/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: 'hsl(var(--canvas))',
        panel: 'hsl(var(--panel))',
        muted: 'hsl(var(--muted))',
        text: 'hsl(var(--text))',
        soft: 'hsl(var(--soft))',
        line: 'hsl(var(--line))',
        accent: 'hsl(var(--accent))',
        'accent-soft': 'hsl(var(--accent-soft))',
        success: 'hsl(var(--success))',
        danger: 'hsl(var(--danger))',
      },
      boxShadow: {
        panel: '0 24px 70px rgba(15, 23, 42, 0.12)',
      },
      fontFamily: {
        display: ['"Aptos"', '"Segoe UI"', 'Calibri', 'Arial', 'sans-serif'],
        sans: ['"Aptos"', '"Segoe UI"', 'Calibri', 'Arial', 'sans-serif'],
        mono: ['Consolas', '"Courier New"', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 280ms ease-out',
      },
    },
  },
  plugins: [],
};
