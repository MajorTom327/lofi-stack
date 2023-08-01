import { useMatchesData } from "./useMatchesData";
import { isNil, propOr } from "ramda";
import type { loader } from "~/root";

export function useEnv(): Record<string, string> | undefined {
  const data = useMatchesData<typeof loader>("root");
  if (!data || isNil(data.env)) {
    return undefined;
  }
  return data.env;
}

export function useEnvValue(
  key: string,
  defaultValue?: string
): string | undefined {
  const env = useEnv();
  // @ts-expect-error Ramda types are not perfect
  return propOr<string | undefined>(defaultValue, key, env);
}

export default useEnv;
