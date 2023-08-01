import Card from "~/components/Card";
import { useEnvValue } from "~/hooks/useEnv";

export default function Index() {
  const appName = useEnvValue("APP_NAME");

  return (
    <div className="container mx-auto">
      <Card>
        <Card.Title>
          <h1 className="">Welcome to {appName || "remix"}</h1>
        </Card.Title>
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
      </Card>
    </div>
  );
}
