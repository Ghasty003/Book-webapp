/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#E91E63",
      },
    },
    screens: {
      mobile: { max: "785px" },
    },
  },
  plugins: [],
};
