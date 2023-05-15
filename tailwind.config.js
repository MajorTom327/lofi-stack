/** @type {import('tailwindcss').Config} */

const lightTheme = {
  primary: "#570DF8",
  secondary: "#F000B8",
  accent: "#37CDBE",
  neutral: "#3D4451",
  "base-100": "#FFFFFF",
  info: "#3ABFF8",
  success: "#36D399",
  warning: "#FBBD23",
  error: "#F87272",
};

const darkTheme = {
  primary: "#661AE6",
  secondary: "#D926AA",
  accent: "#1FB2A5",
  neutral: "#FFFFFF",
  "base-100": "#2A303C",
  info: "#3ABFF8",
  success: "#36D399",
  warning: "#FBBD23",
  error: "#F87272",
};

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [{ light: lightTheme, dark: darkTheme }],
  },

  plugins: [require("daisyui")],
};
