import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useToggle } from "ahooks";
import classNames from "classnames";
import { MenuIcon } from "lucide-react";
import stylesheet from "~/tailwind.css";

import { authenticator } from "~/services/auth.server";

import Layout from "./components/Layout";
import Footer from "./components/Layout/Footer";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/toaster";
import { getPublicEnv } from "./lib/env.server";
import SessionStore from "./services/session.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const session = await new SessionStore(request).load();
  const env = getPublicEnv();

  const csrf = session.getCsrfToken();

  return json(
    {
      user,
      csrf,
      env,
    },
    {
      headers: await session.withCookieHeader({}),
    }
  );
};

export default function App() {
  const { user, env } = useLoaderData<typeof loader>();

  const [sidebarOpen, { toggle }] = useToggle(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout
          nav={
            <Navbar>
              <div className="flex gap-2 items-center">
                <Navbar.Brand>
                  <Button color="ghost" to="/">
                    {env.APP_NAME}
                  </Button>
                </Navbar.Brand>
                {user && (
                  <Button
                    aria-label="Toggle sidebar"
                    onClick={() => toggle()}
                    className={classNames("transition", {
                      "opacity-25 hover:opacity-80": sidebarOpen,
                    })}
                  >
                    <MenuIcon />
                  </Button>
                )}
              </div>

              {user && (
                <div className="flex gap-2 items-center">
                  {/* <SwitchDarkMode
                      aria-label="Toggle dark mode"
                      color="primary"
                      checked={isDark}
                      onCheckedChange={setIsDark}
                    /> */}
                  <Button to="/profile">{user.email}</Button>
                  <Form method="POST" action="/logout">
                    <Button type="submit">Logout</Button>
                  </Form>
                </div>
              )}
            </Navbar>
          }
          footer={<Footer />}
        >
          {user ? (
            <Sidebar isOpen={sidebarOpen} content={<Outlet />}>
              <Menu>
                <Menu.Item to="/">Home</Menu.Item>
                <Menu.Title>My experiences</Menu.Title>
                <Menu.Item to="/studies">Studies</Menu.Item>
              </Menu>
            </Sidebar>
          ) : (
            <Outlet />
          )}
        </Layout>

        <Toaster />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
