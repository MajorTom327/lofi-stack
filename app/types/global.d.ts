import type { IEnvVars } from "~/lib/env.server";

declare global {
  namespace NodeJS {
    type ProcessEnv = IEnvVars;
  }
}

export {};
