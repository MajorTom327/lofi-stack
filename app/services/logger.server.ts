import pino from "pino";
import { match } from "ts-pattern";
import Env from "./env.server";

const logLevel = match(Env.get("NODE_ENV"))
  .with("development", () => "debug")
  .with("test", () => "silent")
  .otherwise(() => "info");

const logger = pino(
  pino.transport({
    targets: [
      {
        level: logLevel,
        target: "pino-pretty",
      },
      {
        target: "pino/file",
        options: {
          destination: "./logs/app.log",
          sync: false,
        },
      },
    ],
  }),
);

export default logger;
