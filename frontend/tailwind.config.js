/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'hopium-blue': '#3B82F6',
        'hopium-purple': '#8B5CF6',
        'hopium-pink': '#EC4899',
      },
    },
  },
  plugins: [],
}