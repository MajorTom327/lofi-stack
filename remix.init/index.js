const fs = require("fs");
const inquirer = require("inquirer");
const pkg = require("./package.json");

fs.copyFileSync("./.env.dist", "./.env");

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
      fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
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

      fs.writeFileSync("./.github/dependabot.yml", dependabot);
    }

    const actionContent = fs
      .readFileSync("./.github/workflows/build.yml")
      .toString();

    // Re-enable cache for yarn as it is disabled for the stack
    const newAction = actionContent.replace(
      /# cache: "yarn"/g,
      `cache: "yarn"`
    );

    fs.writeFileSync("./.github/workflows/build.yml", newAction);

    console.log("🎉  Done!");
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
