/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        gold: {
          DEFAULT: '#00ff15',
          muted:   '#2fff00',
          dim:     '#1ae603',
          dark:    '#37ff0f',
        },
        dark: {
          base:     '#131313',
          surface:  '#1A1A1A',
          card:     '#1F1F1F',
          elevated: '#1F1F1F',
          deeper:   '#0D0D0D',
          border:   '#2A2A2A',
        },
      },
      boxShadow: {
        'gold-sm': '0 0 20px rgba(239,211,149,0.15)',
        'gold':    '0 0 40px rgba(239,211,149,0.20)',
        'card':    '0 4px 24px rgba(0,0,0,0.4)',
        'card-lg': '0 16px 48px rgba(0,0,0,0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        'shimmer':   'shimmer 2.5s linear infinite',
        'pulse-gold':'pulseGold 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':       { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239,211,149,0)' },
          '50%':       { boxShadow: '0 0 20px 4px rgba(239,211,149,0.15)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
      },
    },
  },
  plugins: [],
};
