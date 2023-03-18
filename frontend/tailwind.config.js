/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      visibility: ['group-hover'],
      colors: {site: {secondary: '#f9787c', primary: '#ff5a60'}},
    },
  },
  plugins: [],
};
