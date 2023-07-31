const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
const { v4: uuidV4 } = require("uuid");
const { execSync } = require("child_process");

const main = async ({ rootDirectory }) => {
  console.log("🚀  Initializing your project...");
  const cwd = path.resolve(rootDirectory);

  const DIR_NAME = path.basename(rootDirectory);
  const APP_NAME = (DIR_NAME + "-").replace(/[^a-zA-Z0-9-_]/g, "-");

  const configMessageDone = `
👉  cd ${rootDirectory}
👉  yarn install
👉  yarn dev

👉  git init # if not already done
👉  git add .
👉  git commit -m "Initial commit"
👉  git push origin main`;

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
    ])
    .then(async (answers) => {
      fs.copyFileSync(
        path.resolve(cwd, ".env.dist"),
        path.resolve(cwd, ".env")
      );

      if (answers.dependenciesManager === "yarn") {
        fs.unlinkSync(path.resolve(cwd, "package-lock.json"));
      }

      console.log("📝  Setting up environment files");
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

          const result = data
            .replace(/APP_NAME=.*$/g, `APP_NAME=${APP_NAME}`)
            .replace(/APP_KEY=.*$/g, `APP_KEY=${uuidV4()}`)
            .replace(/SESSION_SECRET=.*$/g, `SESSION_SECRET=${uuidV4()}`);

          fs.writeFile(
            path.resolve(cwd, ".env"),
            result,
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
      })).then((data) => {
        console.log("📝  Setting up environment files", data)
      }).catch((err) => {
        console.error("Something goes wrong", err)
      });





      if (answers.git && answers.husky) {
        console.log("📝  Setting up Husky")
        const pkg = require(path.resolve(cwd, "package.json"));
        pkg.scripts.prepare = "husky install";
        fs.writeFileSync(
          path.resolve(cwd, "package.json"),
          JSON.stringify(pkg, null, 2)
        );
      }

      // Configure dependabot
      if (answers.dependabot) {
        console.log("📝  Setting up dependabot")
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
      console.log("📝  Setting up github actions")
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
        console.log("📝  Setting up git")
        try {
          execSync("git init", { cwd });
          execSync("git add .", { cwd });
        } catch (error) {
          console.log("Cannot initialize git repository");
        }
      }

      console.log(configMessageDone);

      console.log("🎉  Ready to go !");
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
