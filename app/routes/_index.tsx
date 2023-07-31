import { Card, Menu } from "react-daisyui";

export default function Index() {
  return (
    <div className="container mx-auto">
      <Card>
        <Card.Body>
          <Card.Title>
            <h1 className="text-2xl font-primary">Welcome to Remix</h1>
          </Card.Title>
          <Menu>
            <Menu.Item>
              <a
                target="_blank"
                href="https://remix.run/tutorials/blog"
                rel="noreferrer"
              >
                15m Quickstart Blog Tutorial
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                target="_blank"
                href="https://remix.run/tutorials/jokes"
                rel="noreferrer"
              >
                Deep Dive Jokes App Tutorial
              </a>
            </Menu.Item>
            <Menu.Item>
              <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
                Remix Docs
              </a>
            </Menu.Item>
          </Menu>
        </Card.Body>
      </Card>
    </div>
  );
}
