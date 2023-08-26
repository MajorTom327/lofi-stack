import type { LoaderArgs } from "@remix-run/node";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useEnvValue } from "~/hooks/useEnv";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return {};
};

export default function DashboardRoute() {
  const appName = useEnvValue("APP_NAME");

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="">Welcome to {appName || "remix"}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/blog"
              rel="noreferrer"
            >
              15m Quickstart Blog Tutorial
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://remix.run/tutorials/jokes"
              rel="noreferrer"
            >
              Deep Dive Jokes App Tutorial
            </a>
          </li>
          <li>
            <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
              Remix Docs
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
