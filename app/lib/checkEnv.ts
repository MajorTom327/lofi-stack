export type EnvConfig = Partial<Record<"required" | "optional", string[]>>;

export const checkEnv = (config: EnvConfig) => {
  const missing: string[] = [];
  const { required, optional } = config;

  required?.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  optional?.forEach((key) => {
    if (!process.env[key]) {
      console.warn(`Missing optional environment variable: ${key}`);
    }
  });
};

export default checkEnv;
