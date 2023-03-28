/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        actionsPopup: "70%, 30%",
      },
    },
  },
  plugins: [],
};