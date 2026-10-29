/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
    './node_modules/flowbite/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        green: {
          500: '#3BBFA1'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
