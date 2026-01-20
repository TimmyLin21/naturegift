/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        primary: '#D9E2D5',
        secondary: '#3e6765',
        success: 'rgba(61, 102, 100, 0.8)',
        info: '#B37A4C',
        dark: '#121212',
        light: '#f9faee',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
