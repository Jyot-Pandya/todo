/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A202C",
        secondary: "#2D3748",
        accent: "#38B2AC",
        light: "#F7FAFC",
      },
      fontFamily: {
        sans: ['"Open Sans"', "sans-serif"],
        serif: ['"Merriweather"', "serif"],
      },
    },
  },
  plugins: [],
}
