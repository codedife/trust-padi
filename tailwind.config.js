/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#073B78",
        secondary: "#0F5EB5",
        background: "#F5F7FA",
        dark: "#172B45",
      },
    },
  },
  plugins: [],
};