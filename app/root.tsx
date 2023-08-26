import Layout from "./components/Layout";
import Footer from "./components/Layout/Footer";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Button } from "./components/ui/button";
import { authenticator } from "./services/auth.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/node";
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
import classNames from "classnames";
import { Menu as MenuIcon } from "lucide-react";
import { F, T, assoc, keys } from "ramda";
import { useState } from "react";
import {
  AuthenticityTokenProvider,
  createAuthenticityToken,
} from "remix-utils";
import { match } from "ts-pattern";
import { ErrorHandler } from "~/components/ErrorHandler";
import baseStyle from "~/index.css";
import { sessionStorage } from "~/services/session.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "seeker" }];
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: baseStyle },
];
export const loader: LoaderFunction = async ({ request }) => {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  const csrf = createAuthenticityToken(session);

  const user = await authenticator.isAuthenticated(request);

  // * Set here the publics env variables
  const env = keys(process.env)
    // .filter((key) => key.toString().startsWith("PUBLIC_"))
    .filter((key) =>
      match(key.toString())
        .with("APP_NAME", T)
        .when((k) => k.startsWith("PUBLIC_"), T)
        .otherwise(F)
    )
    .reduce((acc, key) => {
      const value = process.env[key];
      return assoc(key.toString().replace("PUBLIC_", ""), value, acc);
    }, {});

  return json(
    { csrf, env, user },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }
  );
};

export default function App() {
  const { csrf, env, user } = useLoaderData<typeof loader>();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-base-100 text-base-100-content">
        <AuthenticityTokenProvider token={csrf}>
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
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className={classNames("transition", {
                        "opacity-25 hover:opacity-80": sidebarOpen,
                      })}
                    >
                      <MenuIcon />
                    </Button>
                  )}
                </div>
                {user && (
                  <div className="flex gap-2">
                    <Button to="/profile">{user.username}</Button>
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
                  <Menu.Item to="/about">About</Menu.Item>
                </Menu>
              </Sidebar>
            ) : (
              <Outlet />
            )}
          </Layout>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </AuthenticityTokenProvider>
      </body>
    </html>
  );
}

export const ErrorBoundary = ErrorHandler;
