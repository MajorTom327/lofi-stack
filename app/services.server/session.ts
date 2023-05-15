import { createCookieSessionStorage } from "@vercel/remix";
import assert from "node:assert";
import { isNil } from "ramda";

import { isProduction } from "~/lib/isEnv";

const sessionSecret = process.env.SESSION_SECRET;

assert(!isNil(sessionSecret), "SESSION_SECRET is not defined");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret!],
    secure: isProduction(),
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;
