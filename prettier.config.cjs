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
};
