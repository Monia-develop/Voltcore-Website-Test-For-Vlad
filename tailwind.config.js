/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
fontFamily: 
{
  sans: ["AkkuratLL", "Helvetica Neue", "Arial", "sans-serif"],
  antonym: ["Antonym", "serif"],
  parisienne: ["Parisienne", "cursive"],
},
    extend: {
      colors: {
        primary: "#00C2FF",
        secondary: "#DD0BFF",
        dark: "#111111",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};