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
          textlight: "#474E68",
          textdark: "#F1F6F9",
          "calendar-icon": "red",
        },
      },
    },
  },
  plugins: [],
  purge: {
    content: [
      "./src/**/*.html",
      "./src/**/*.js",
      // Add more file paths or glob patterns here
    ],
    options: {
      defaultExtractor: (content) =>
        content.match(/[A-Za-z0-9-_:/]+/g) || [],
      output: "./public", // Specify the output directory here
    },
  },
};
