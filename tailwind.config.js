/** @type {import('tailwindcss').Config} */
export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {

      
//     },
//   },
//   plugins: [],
// }





// /** @type {import('tailwindcss').Config} */
// module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      textShadow: {
        'blue': '5px 5px 10px blue',
      },

      keyframes: {
        'tilt-shaking': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },

       
        'colorAnimate': {
          '0%': { borderColor: 'salmon' },
          '25%': { borderColor: '#e18ce1' },
          '50%': { borderColor: 'paleturquoise' },
          '75%': { borderColor: 'green' },
          '100%': { borderColor: 'yellow' }
        },


        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },


      },
      animation: {
        'tilt-shaking': 'tilt-shaking 0.8s infinite',
        'color-animate': 'colorAnimate 5s ease-in 1s infinite',
        scroll: 'scroll 10s linear infinite',
      
      }


    },
  },
  
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-blue': {
          textShadow: '5px 5px 10px blue',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}