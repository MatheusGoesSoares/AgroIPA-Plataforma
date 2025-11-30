/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "agro-forest": "#03312E",
        "agro-card": "#F8F7F2",
      },
    },
  },
  plugins: [],
};