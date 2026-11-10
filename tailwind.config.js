/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        frog: '#76B82A',
        forest: '#173D28',
        deep: '#10291C',
        mustard: '#E7B83F',
        cream: '#F5F0E5',
        earth: '#735237',
        charcoal: '#171A16',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['Figtree', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
