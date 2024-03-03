// @ts-expect-error Bun is provided by bun not a package
import Bun from "bun";
import fs from "fs/promises";

import { Config } from "./get_config";

export const generate_page = async (config: Config) => {
  console.log(
    `\x1b[90;2mGenerating page \x1b[0;90;3m"${config.pageName}"\x1b[0;2;90m...\x1b[0m`,
  );

  const pagePath = `${config.projectPath}/routes/${config.pageName}`;

  await fs.mkdir(pagePath, { recursive: true });

  const pageName = `${config.pageClass}Page`;

  const indexContent = [
    `import ErrorHandler from "~/components/ErrorHandler";`,
    ``,
    `export const ${pageName} = () => {`,
    `  return <>${config.pageName}</>;`,
    `};`,
    ``,
    `export const ErrorBoundary = ErrorHandler;`,
    ``,
    `export default ${pageName};`,
  ].join("\n");

  await Promise.all([Bun.write(`${pagePath}/index.tsx`, indexContent)]);

  console.log("\x1b[32mNew Page generated successfully!\x1b[0m");
};
