import fs from "fs";
import path from "path";
import RA from "ramda-adjunct";

const pageName = process.argv[2].replace(/\//g, ".");

if (RA.isNilOrEmpty(pageName)) {
  console.error("Please provide a page name");
  process.exit(1);
}

const local_directory = process.cwd();
// const local_directory = __dirname;

const pagePath = path.resolve(local_directory, "app/routes", pageName);

fs.mkdirSync(pagePath);
const indexPage = path.resolve(pagePath, "route.tsx");

const composantName = pageName
  .replace(/_/g, "")
  .split(".")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join("")
  .split("$")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join("");

const lines = [
  `import ErrorHandler from "~/components/ErrorHandler";`,
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
