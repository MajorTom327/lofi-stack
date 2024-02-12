const fs = require("node:fs/promises");
const path = require('path');
const { match } = require('ts-pattern')

const getPackageManagerCommand = (packageManager) =>
  match(packageManager)
    .with("bun", () => ({
      exec: "bunx",
      lockfile: "bun.lockb",
      run: (script, args) => `bun run ${script} ${args || ""}`,
      install: (packages = [], isDev = false) =>
        ["bun add", isDev ? "--dev" : undefined, packages.join(" ")]
          .filter(Boolean)
          .join(" "),
    }))
    .with("npm", () => ({
      exec: "npx",
      lockfile: "package-lock.json",
      run: (script, args) => `npm run ${script} ${args ? `-- ${args}` : ""}`,
      install: (packages = [], isDev = false) =>
        ["npm install", isDev ? "--save-dev" : undefined, packages.join(" ")]
          .filter(Boolean)
          .join(" "),
    }))
    .with("pnpm", () => {
      const pnpmVersion = getPackageManagerVersion("pnpm");
      const includeDoubleDashBeforeArgs = semver.lt(pnpmVersion, "7.0.0");
      const useExec = semver.gte(pnpmVersion, "6.13.0");

      return {
        exec: useExec ? "pnpm exec" : "pnpx",
        lockfile: "pnpm-lock.yaml",
        run: (script, args) =>
          includeDoubleDashBeforeArgs
            ? `pnpm run ${script} ${args ? `-- ${args}` : ""}`
            : `pnpm run ${script} ${args || ""}`,
        install: (packages = [], isDev = false) =>
          ["pnpm add", isDev ? "--save-dev" : undefined, packages.join(" ")]
            .filter(Boolean)
            .join(" "),
      };
    })
    .with("yarn", () => ({
      exec: "yarn",
      lockfile: "yarn.lock",
      run: (script, args) => `yarn ${script} ${args || ""}`,
      install: (packages = [], isDev = false) =>
        [`yarn add`, isDev ? "-D" : undefined, packages.join(" ")]
          .filter(Boolean)
          .join(" "),
    }))
    .exhaustive();

const askQuestions = async () => {
  const inquirer = require("inquirer");

  const answers = await inquirer.prompt([
        {
      name: "dependabot",
      type: "confirm",
      default: false,
      message: "Do you want to enable Dependabot for this project?",
    },
    {
      type: "input",
      when: (answers) => answers.dependabot,
      name: "reviewer",
      message: "What is your github username?",
    },
    {
      type: "confirm",
      name: "postgres",
      message: "Do you want to use Postgres?",
      default: false,
    }
  ])

  return answers
}

const initializeFiles = async ({ answers, rootDirectory }) => {

  const ejs = require("ejs");
  await Promise.all([
    fs.copyFile(path.join(rootDirectory, "remix.init", "gitignore"), path.join(rootDirectory, ".gitignore")),
    ...["build", "format-repo", "lint-repo"].map((workflow) => {
      return new Promise((resolve) => {
        const from = path.join(rootDirectory, `remix.init/workflows/${workflow}.yml.ejs`)
        const to = path.join(rootDirectory, `.github/workflows/${workflow}.yml`);

        ejs.renderFile(from, answers,
          (err, str) => {
            if (err) {
              console.error(err);
              return;
            }

            fs.writeFile(to, str).then(resolve).catch(() => {
              console.error(`Error writing to ${to}`);
            });
          },
        );
      });
    }),
  ]);
}

const initDatabase = async ({ answers, rootDirectory, packageManagerCommand }) => {
  if (!answers.postgres) return

  await fs.copyFile(
    path.join(rootDirectory, "remix.init", "docker-compose.yml"),
    path.join(rootDirectory, "docker-compose.yml")
  );

  await packageManagerCommand.install('prisma', true);
  await packageManagerCommand.run('prisma', 'init');

  const PackageJson = require("@npmcli/package-json");
  const packageJson = await PackageJson.load(rootDirectory)

  await packageJson.update({
    scripts: {
      "db:gen": "prisma generate",
      "db:migrate": "prisma migrate dev",
      "db:seed": "prisma db seed",
      "db:studio": "prisma studio",
    },
  });

  const lines = [
    `# Database Env Variables`,
    `DATABASE_URL="postgresql://{{docker:postgres.POSTGRES_USER}}:{{docker:postgres.POSTGRES_PASSWORD}}@localhost:5432/{{docker:postgres.POSTGRES_DB}}"`,
  ]

  await fs.appendFile(path.resolve(rootDirectory, ".env.dist"), lines.join('\n'))
}

const main = async ({ packageManager, rootDirectory }) => {
  const PackageJson = require("@npmcli/package-json");

  const DIR_NAME = path.basename(rootDirectory);
  const APP_NAME = DIR_NAME
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-");

  const packageManagerCommand = getPackageManagerCommand(packageManager)
  const answers = await askQuestions({ packageManager, rootDirectory})


  const packageJson = await PackageJson.load(rootDirectory)

  packageJson.update({
    name: APP_NAME,
    version: "0.0.0",
  });

  await initializeFiles({ rootDirectory, answers, packageManagerCommand });
  await initDatabase({ rootDirectory, answers,packageManagerCommand });

  await packageManagerCommand.run('env:gen');

}

module.exports = main
