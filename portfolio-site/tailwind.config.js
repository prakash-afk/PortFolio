/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#4361ee',
          hover: '#3a56d4',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(67, 97, 238, 0.35)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
