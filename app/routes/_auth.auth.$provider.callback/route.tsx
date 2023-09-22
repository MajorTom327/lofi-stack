import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/services/auth.server";
import type { AuthStrategy } from "~/services/auth.server";

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  // If the provider is not specified, redirect to the login page
  if (!params.provider) return redirect("/login");

  const provider = params.provider as AuthStrategy;

  return authenticator.authenticate(provider, request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
};
