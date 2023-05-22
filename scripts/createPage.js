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
  .join("");

const lines = [
  `import type { ActionFunction, LoaderFunction } from "@remix-run/node";`,
  `import { json } from "@vercel/remix";`,
  ``,
  `import ErrorHandler from "~/components/ErrorHandler";`,
  ``,
  `type LoaderData = {};`,
  ``,
  `export const loader: LoaderFunction = async () => {`,
  `  return json<LoaderData>({});`,
  `};`,
  ``,
  `export const ${composantName} = () => {`,
  `  return <>${composantName}</>;`,
  `};`,
  ``,
  `export const action: ActionFunction = async () => {`,
  `  return json({});`,
  `}`,
  ``,
  `export const ErrorBoundary = ErrorHandler;`,
  ``,
  `export default ${composantName};`,
];

lines.forEach((line) => fs.appendFileSync(indexPage, `${line}\n`));
