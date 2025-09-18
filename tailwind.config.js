/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './resources/**/*.{js,jsx,ts,tsx}',
    './resources/**/*.blade.php',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f9',
          100: '#e3e8f4',
          200: '#c7d1e9',
          300: '#a3b4db',
          400: '#7c93ca',
          500: '#5f75b8',
          600: '#4d5ea3',
          700: '#414c85',
          800: '#37406d',
          900: '#2f365c',
          950: '#1d2139',
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};