/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          dark: '#041710',
          card: '#082117',
          emerald: '#10b981',
          neon: '#34d399',
        }
      }
    },
  },
  plugins: [],
}
