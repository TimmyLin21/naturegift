/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
    container: {
      center: true,
      padding: '0.75rem',
      screens: {
        'sm': '540px',
        'md': '720px',
        'lg': '960px',
        'xl': '1140px',
        '2xl': '1320px',
      },
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
