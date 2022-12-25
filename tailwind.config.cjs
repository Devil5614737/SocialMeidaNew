/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "modalOverlay":"rgba(0,0,0,.7)"
      }
    },
  },
  plugins: [],
}
