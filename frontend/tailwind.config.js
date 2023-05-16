/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      visibility: ["group-hover"],
      colors: {
        site: {
          secondary: "#f9787c",
          primary: "#ff5a60",
          darkblue: "#001633",
          midblue: "#003682",
          ablue: "#00275a",
          bblue: "#00050c",
          lightblue: "#bdd8ff",
          black: "#000",
          light: "#fafafa",
        },
      },
    },
  },
  plugins: [],
};
