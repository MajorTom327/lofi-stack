const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const { execSync } = require("child_process");

const { match } = require('ts-pattern');

const main = async ({ rootDirectory }) => {
  console.log("🚀  Initializing your project...");
  const cwd = path.resolve(rootDirectory);

  const DIR_NAME = path.basename(rootDirectory);
  const APP_NAME = (DIR_NAME + "-").replace(/[^a-zA-Z0-9-_]/g, "-");

  const configMessageDone = `
🎉  Your project is ready!
$> cd ${rootDirectory}
$> yarn dev

If you didn't choose to enable git, maybe you should enable it now:
$> git init

If you want to commit your project, you can use:
$> git add .
$> git commit -m "Initial commit"

$> git remote add origin <your-repository-url>
$> git push origin main

And if you use docker, you should use:
$> docker-compose up -d

Happy coding with the Lofi-Stack and Remix!
`;

  const dependabotContent = `
version: 2
updates:
  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: daily
    reviewers:
      - "##octocat##"
  - package-ecosystem: "npm" # See documentation for possible values
    directory: "/" # Location of package manifests
    schedule:
      interval: "daily"
    reviewers:
      - "##octocat##"
`;

  await inquirer
    .prompt([
      {
        type: "list",
        name: "dependenciesManager",
        message: "Which dependencies manager do you want to use?",
        choices: ["yarn", "npm"],
        loop: true,
      },
      {
        type: "confirm",
        name: "dependabot",
        message: "Do you want to add dependabot?",
        default: true,
      },
      {
        type: "input",
        when: (answers) => answers.dependabot,
        name: "reviewer",
        message: "What is your github username?",
        default: "octocat",
      },
      {
        type: "confirm",
        name: "git",
        message: "Do you want to initialize a git repository?",
      },
      {
        type: "confirm",
        when: (answers) => answers.git,
        name: "husky",
        message: "Do you want to add husky?",
        default: true,
      },
      {
        type: "confirm",
        name: "docker",
        message: "Keep docker-compose with postgresql",
        default: true,
      }
    ])
    .then(async (answers) => {
      fs.copyFileSync(
        path.resolve(cwd, ".env.dist"),
        path.resolve(cwd, ".env")
      );

      if (answers.dependenciesManager === "yarn") {
        fs.unlinkSync(path.resolve(cwd, "package-lock.json"));
      }

      await (new Promise((resolve, reject) => {
        return fs.readFile(
          path.resolve(cwd, ".env"),
          "utf8",
          function (err, data) {
            if (err) {
              console.log("An error occured while reading Object from File.", err);
              return reject(err);
            }
            return resolve(data);
          })
      }).then((data) => {
        return new Promise((resolve, reject) => {

          let result = data.split("\n").map((line) => {
            if (!line || line.length === 0) return line;
            const [key, value] = line.split("=");

            const new_value = match(key)
              .with("APP_NAME", () => (APP_NAME))
              .with("APP_KEY", () => (uuidV4()))
              .with('SESSION_SECRET', () => (uuidV4()))
              .otherwise(() => (value));

            return [key, new_value].join("=");
          })


          if (answers.docker) {
            result.push("POSTGRES_USER=postgres");
            result.push("POSTGRES_PASSWORD=postgres")
            result.push("POSTGRES_DB=dev")
          }

          fs.writeFile(
            path.resolve(cwd, ".env"),
            result.join("\n"),
            "utf8",
            function (err) {
              if (err) {
                console.error("An error occured while writing JSON Object to File.", err);
                return reject(err)
              };
              return resolve(result);
            }
          );
        })
      })).catch((err) => {
        console.error("Something goes wrong on setting up env...", err)
      });

      if (answers.git && answers.husky) {
        const pkg = require(path.resolve(cwd, "package.json"));
        pkg.scripts.prepare = "husky install";
        fs.writeFileSync(
          path.resolve(cwd, "package.json"),
          JSON.stringify(pkg, null, 2)
        );
      }

      // Configure dependabot
      if (answers.dependabot) {
        const username = answers.reviewer;
        const dependabot = dependabotContent.replace(/##octocat##/g, username);

        fs.writeFileSync(
          path.resolve(cwd, ".github/dependabot.yml"),
          dependabot
        );
      } else {
        fs.unlinkSync(path.resolve(cwd, ".github/dependabot.yml"));
      }

      const actionContent = fs
        .readFileSync(path.resolve(cwd, ".github/workflows/build.yml"))
        .toString();

        // Re-enable cache for yarn as it is disabled for the stack
      const newAction = actionContent.replace(
        /# cache: "yarn"/g,
        `cache: "yarn"`
      );

      fs.writeFileSync(
        path.resolve(cwd, ".github/workflows/build.yml"),
        newAction
      );

      // Configure git
      if (answers.git) {
        try {
          execSync("git init", { cwd });
          execSync("git add .", { cwd });
        } catch (error) {
          console.log("Cannot initialize git repository");
        }
      }

      // Remove docker-compose
      if (!answers.docker) {
        fs.unlinkSync(path.resolve(cwd, "docker-compose.yml"));
      }

      const readmeContent = fs.readFileSync(path.resolve(cwd, "README.md"));
      const newReadme = readmeContent.replace(/LofiStack/g, APP_NAME);

      fs.writeFileSync(path.resolve(cwd, "README.md"), newReadme);

      const rootContent = fs.readFileSync(path.resolve(cwd, "/app/root.tsx"));
      const newRootContent = rootContent.replace(/title: "New Remix App"/g, `title: "${APP_NAME}"`);

      fs.writeFileSync(path.resolve(cwd, "/app/root.tsx"), newRootContent);

      console.log(configMessageDone);
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
        console.log("Cannot configure your project due to a TTY error");
      } else {
        // Something else went wrong
        console.log("Something goes wrong during the configuration", error);
      }
    });
};

module.exports = main;
