/** @type {import('tailwindcss').Config} */

const chroma = require("chroma-js");
const R = require("ramda");

const baseColors = {
  primary: "#570DF8",
  secondary: "#F000B8",
  accent: "#37CDBE",
  neutral: "#1e293b",
  "base-100": "#f8fafc",
  "base-200": "#e2e8f0",
  "base-300": "#94a3b8",
  info: "#3ABFF8",
  success: "#36D399",
  warning: "#FBBD23",
  error: "#F87272",
};

const fullPalette = R.keys(baseColors).reduce((acc, key) => {
  const baseColor = R.prop(key, baseColors);

  const color = chroma(baseColor);
  const content =
    chroma.contrast(color, "white") > 2
      ? R.prop("base-100", baseColors)
      : R.prop("neutral", baseColors);

  const active = color.darken(0.5).hex();

  return R.compose(
    R.assoc(key, color.hex()),
    R.assoc(`${key}-content`, content),
    R.assoc(`${key}-active`, active)
  )(acc);
}, {});

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...fullPalette,
      },
    },
  },

  // daisyui: {
  //   themes: [{ light: lightTheme, dark: darkTheme }],
  // },

  plugins: [],
};
