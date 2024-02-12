module.exports = {
  importOrder: [
    "^~/lib/(.*)$",
    "^~/controllers/(.*)$",
    "^~/models/(.*)$",
    "^~/enums/(.*)$",
    "^~/services/(.*)$",
    "^~/components/(.*)$",
    "^~/hooks/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};
