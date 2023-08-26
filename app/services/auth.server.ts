import { formStrategy } from "./auth_strategies/form.strategy";
import { Authenticator } from "remix-auth";
import { AuthStrategies } from "~/services/auth_strategies";
import { sessionStorage } from "~/services/session.server";

export interface User {
  email: string;
  // Add your own user properties here or extend with a type from your database
}

export type AuthStrategy = (typeof AuthStrategies)[keyof typeof AuthStrategies];

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage);

// Register your strategies below
authenticator.use(formStrategy, AuthStrategies.FORM);
