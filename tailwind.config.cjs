/** @type {import('tailwindcss').Config} */

const chroma = require("chroma-js");
const { assoc } = require("ramda");

// Colors may be reflected in the following files:
// - app/types/refs.d.ts
const colors = {
  primary: "#1d3557",
  secondary: "#457b9d",
  accent: "#a8dadc",
  neutral: "#f1faee",

  info: "#2094f3",
  success: "#009485",
  warning: "#ff9900",
  error: "#ff5724",

  light: "#f1faee",
  dark: "#1d3557",
};

const colorModifier = {
  light: 1,
  dark: 1,
};

const toLight = (color) => chroma(color).brighten(colorModifier.light).hex();
const toDark = (color) => chroma(color).darken(colorModifier.light).hex();
const getContentColor = (colorHex) => {
  const color = chroma(colorHex);
  return chroma.contrast(color, colors.light) > 4 ? colors.light : colors.dark;
};

module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...Object.keys(colors).reduce((acc, color) => {
          const current = {
            DEFAULT: colors[color],
            focus: toLight(colors[color]),
            lighten: toLight(colors[color]),
            darken: toDark(colors[color]),

            content: getContentColor(colors[color]),
            foreground: getContentColor(colors[color]),
          };

          return assoc(color, current, acc);
        }, {}),
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
