/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        's': '428px',
        'xmd': '855'
      }
    },
    fontFamily: {
      'Raleway': [ 'Raleway', 'sans-serif'],
      'Roboto' :['Roboto', 'sans-serif'],
    }
  },
  plugins: [],
}

