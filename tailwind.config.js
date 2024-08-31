/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      gap: {
        'xxs': '0.5rem',
        'xs': '1rem',
        'sm': '2rem',
        'md': '4rem',
        'lg': '8rem',
        'xl': '16rem',
      },
      width: {
        'xxs': '0.5rem',
        'xs': '1rem',
        'sm': '2rem',
        'md': '4rem',
        'lg': '8rem',
        'xl': '16rem',
      },
      padding: {
        'xxs': '0.5rem',
        'xs': '1rem',
        'sm': '2rem',
        'md': '4rem',
        'lg': '8rem',
        'xl': '16rem',
      },
      colors: {
        'primary-white': '#FFFFFF',
        'secondary-white': '#fafafa',
        'primary-black': '#000000',
        'secondary-black': '#666666',
        'primary-red': '#DB4444',
        'secondary-red': '#E9677F',
        'primary-gray': '#DEDEDE',
        'secondary-gray': '#7d8184',
        'primary-yellow': '#FFAD33',
        'primary-green': '#47B486'
      }
    },
  },
  plugins: [],
}