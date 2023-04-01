/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1105px",
      // => @media (min-width: 1105px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        actionsPopup: "70%, 30%",
        mainLayout: "25%,25%,25%,25%,",
      },
    },
  },
  plugins: [],
};