import { isNil, propOr } from "rambda";

import type { loader } from "~/root";

import { useMatchesData } from "./useMatchesData";

export function useEnv(): Record<string, string> | undefined {
  const data = useMatchesData<typeof loader>("root");
  if (!data || isNil(data.env)) {
    return undefined;
  }
  return data.env;
}

export function useEnvValue(
  key: string,
  defaultValue?: string,
): string | undefined {
  const env = useEnv();
  return propOr(defaultValue, key, env);
}

export default useEnv;
