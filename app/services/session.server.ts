import type { Session, SessionData } from "@remix-run/node";
import { createCookieSessionStorage } from "@remix-run/node";
import { v4 as uuidV4 } from "uuid";

import { getEnv, isProduction } from "~/lib/env.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [getEnv("SESSION_SECRET")], // replace this with an actual secret
    secure: isProduction(), // enable this in prod only
  },
});

export class SessionStore {
  request: Request;
  session: Session<SessionData, SessionData> | null = null;

  constructor(request: Request) {
    this.request = request.clone();
  }

  async load() {
    const request = this.request;

    return sessionStorage
      .getSession(request.headers.get("Cookie"))
      .then((session) => {
        this.session = session;
        return this;
      });
  }

  commit() {
    return sessionStorage.commitSession(this.session!);
  }

  withCookieHeader(headers: Headers | Record<string, string>) {
    return this.commit().then((cookie) => {
      if (headers instanceof Headers) {
        headers.append("Set-Cookie", cookie);
      } else {
        headers["Set-Cookie"] = cookie;
      }
      return headers;
    });
  }

  get<T>(key: string): T | undefined {
    return this.session?.get(key);
  }

  set(key: string, value: any) {
    this.session?.set(key, value);
    return this;
  }

  flash(key: string, value: any) {
    this.session?.flash(key, value);
    return this;
  }

  setSession(session: Session<SessionData, SessionData>) {
    this.session = session;
    return this;
  }

  getSession() {
    return this.session;
  }
}

export class CsrfSessionStore extends SessionStore {
  token: string | null = null;

  generateToken() {
    this.token = uuidV4();
    this.set("csrf", this.token);
    return this;
  }

  getCsrfToken() {
    if (this.token) {
      return this.token;
    }

    let token = this.get<string>("csrf");

    if (token) {
      this.token = token;
      return token;
    }

    this.token = uuidV4();
    this.set("csrf", this.token);

    return this.token;
  }

  checkCsrfToken(token: string) {
    return this.getCsrfToken() === token;
  }

  assertCsrfToken(token: string) {
    if (!this.checkCsrfToken(token)) {
      throw new Error("Invalid CSRF token");
    }
  }
}

export default CsrfSessionStore;
