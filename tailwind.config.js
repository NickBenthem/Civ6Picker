/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fill-200px': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      keyframes: {
        'scroll-text': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(calc(-100% + 100px))' },
        }
      },
      animation: {
        'scroll-text': 'scroll-text 5s ease-in-out forwards',
      }
    },
  },
  plugins: [],
};
