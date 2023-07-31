import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { assoc, keys } from "ramda";
import {
  AuthenticityTokenProvider,
  createAuthenticityToken,
} from "remix-utils";
import baseStyle from "~/index.css";

import { sessionStorage } from "~/services/session.server";

import { ErrorHandler } from "~/components/ErrorHandler";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
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

  // * Set here the publics env variables
  const env = keys(process.env)
    .filter((key) => key.toString().startsWith("PUBLIC_"))
    .reduce((acc, key) => {
      const value = process.env[key];
      return assoc(key.toString().replace("PUBLIC_", ""), value, acc);
    }, {});

  return json(
    { csrf, env },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }
  );
};

export default function App() {
  const { csrf } = useLoaderData<typeof loader>();

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
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </AuthenticityTokenProvider>
      </body>
    </html>
  );
}

export const ErrorBoundary = ErrorHandler;
