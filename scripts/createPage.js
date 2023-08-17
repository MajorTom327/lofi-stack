const fs = require("fs");
const path = require("path");
const RA = require("ramda-adjunct");

const pageName = process.argv[2].replace(/\//g, ".");

if (RA.isNilOrEmpty(pageName)) {
  console.error("Please provide a page name");
  process.exit(1);
}

const pagePath = path.resolve(__dirname, "../app/routes", pageName);

fs.mkdirSync(pagePath);
const indexPage = path.resolve(pagePath, "index.tsx");

const composantName = pageName
  .replace(/_/g, "")
  .split(".")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join("")
  .split("$")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join("");

const lines = [
  `import type { ActionFunction, LoaderArgs } from "@remix-run/node";`,
  `import ErrorHandler from "~/components/ErrorHandler";`,
  ``,
  `export const loader = async ({ request }: LoaderArgs) => {`,
  `  return {};`,
  `};`,
  ``,
  `export const ${composantName} = () => {`,
  `  return <>${composantName}</>;`,
  `};`,
  ``,
  `export const ErrorBoundary = ErrorHandler;`,
  ``,
  `export default ${composantName};`,
];

lines.forEach((line) => fs.appendFileSync(indexPage, `${line}\n`));
