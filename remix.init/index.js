const fs = require("fs");

fs.copyFileSync("./.env.dist", "./.env");
