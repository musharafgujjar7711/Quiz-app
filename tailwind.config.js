/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{},
      container:{
        center:true,
        padding:{
          DEFAULTS:"1rem",
          sm:"3rem"
        },
        screens:{
          md:"1440px",
          lg:"1440px",
          xl:"1440px",
          "2xl":"1440px"
        }
      },
    },
  },
  plugins: [],
}
