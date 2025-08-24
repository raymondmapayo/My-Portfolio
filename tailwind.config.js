// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: "#fa8c16",
          400: "#ffc069",
          300: "#ffa940",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
