/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Extend the default theme with custom fonts and colors
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        lexend: ['Lexend Deca', 'sans-serif'],
        sans: ['Inter', 'Lexend Deca', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        baumans: ['Baumans', 'cursive'],
        comfortaa: ['Comfortaa', 'cursive'],
        shadows: ['"Shadows Into Light Two"', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
      },
      
      colors: {
        // Ensure your primary color is defined if not already
        primary: {
          DEFAULT: '#10B981', // Teal-500
          dark: '#059669',    // Teal-600
        },
        // You can add more custom colors here if needed
      },
      // Optionally, you can add custom font sizes, spacing, etc.
      // For example:
      // fontSize: {
      //   'xxs': '0.65rem',
      // },
    },
  },
  plugins: [],
}
