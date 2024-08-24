/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6947BF',
        'custom-light-gray': '#5B6170',
        'custom-dark-gray': '#3D404B',
        'custom-lightest-gray': '#E5ECF3'
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    }
  },
  plugins: [],
}

