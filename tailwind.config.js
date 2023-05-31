/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#C7F2A4',
        second: '#B6E388',
      },
      fontFamily: {
        display: ['Dancing Script', 'cursive'],
      },
      inset: { neg: '-1.5rem' },
    },
  },
  plugins: ['@material-tailwind/react'],
});
