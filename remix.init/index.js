const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

console.log("🚀  Initializing your project...", __dirname);
const cwd = path.resolve(__dirname, "..");
fs.copyFileSync(path.resolve(cwd, ".env.dist"), path.resolve(cwd, ".env"));

const pkg = require(path.resolve(cwd, "package.json"));

inquirer
  .prompt([
    {
      type: "confirm",
      name: "dependabot",
      message: "Do you want to add dependabot?",
      default: true,
    },
    {
      type: "input",
      name: "reviewer",
      message: "What is your github username?",
      default: "octocat",
    },
    {
      type: "confirm",
      name: "husky",
      message: "Do you want to add husky?",
      default: true,
    },
  ])
  .then((answers) => {
    if (answers.husky) {
      pkg.scripts.prepare = "husky install";
      fs.writeFileSync(
        path.resolve(cwd, "package.json"),
        JSON.stringify(pkg, null, 2)
      );
    }

    if (answers.dependabot) {
      const username = answers.reviewer;
      const dependabot = `
  version: 2
  updates:
    - package-ecosystem: github-actions
      directory: /
      schedule:
        interval: daily
      reviewers:
        - "${username}"
    - package-ecosystem: "npm" # See documentation for possible values
      directory: "/" # Location of package manifests
      schedule:
        interval: "daily"
      reviewers:
        - "${username}"
  `;

      fs.writeFileSync(path.resolve(cwd, ".github/dependabot.yml"), dependabot);
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

    console.log("🎉  Done!");
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
