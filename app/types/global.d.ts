import type { IEnvVars } from "~/lib/env.server";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends IEnvVars {}
  }
}

export {};
