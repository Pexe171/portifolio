module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9333ea", // roxo
          light: "#a855f7",
        },
        secondary: {
          DEFAULT: "#ec4899", // rosa
          light: "#f472b6",
        },
        accent: "#c084fc",
      },
    },
  },
  plugins: [],
};
