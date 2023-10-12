import zod from "zod";

export const publicEnvSchema = zod.object({
  APP_NAME: zod.string().default("My App"),
  APP_URL: zod.string().default("http://localhost:3000"),
});

export const envSchema = zod
  .object({
    NODE_ENV: zod.enum(["development", "production", "test"]),
    APP_NAME: zod.string().default("My App"),
    APP_KEY: zod.string(),
    SESSION_SECRET: zod.string().uuid(),
  })
  .merge(publicEnvSchema);

export type IEnvVars = zod.infer<typeof envSchema>;

export const getEnv = (key: keyof IEnvVars, defaultValue: any = undefined) => {
  const env = envSchema.parse(process.env);

  const value = env[key];
  return value || defaultValue;
};

/**
 * A tool utility function to get all the public environment variables.
 * @returns A record of all the environment variable that are public.
 */
export const getPublicEnv = () => {
  return publicEnvSchema.parse(process.env);
};

export const isProduction = () => getEnv("NODE_ENV") === "production";
export const isDevelopment = () => getEnv("NODE_ENV") === "development";
export const isTest = () => getEnv("NODE_ENV") === "test";
