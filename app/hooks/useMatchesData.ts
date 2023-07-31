import { useMatches } from "@remix-run/react";
import type { SerializeFrom } from "@remix-run/server-runtime";
import { useMemo } from "react";

export function useMatchesData<T>(id: string): SerializeFrom<T> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

export default useMatchesData;
