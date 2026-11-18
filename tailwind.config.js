/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FBBF24',
          yellowDark: '#F59E0B',
          yellowLight: '#FEF3C7',
        }
      }
    },
  },
  plugins: [],
}
