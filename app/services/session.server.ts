import { createCookieSessionStorage } from "@remix-run/node";
import Env from "./env.server";

// export the whole sessionStorage object
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [Env.get<string>("SESSION_SECRET")], // replace this with an actual secret
    secure: Env.get("NODE_ENV") === "production", // enable this in prod only
  },
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = sessionStorage;
