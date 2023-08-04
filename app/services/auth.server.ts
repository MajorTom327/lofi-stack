import { formStrategy } from "./auth_strategies/form.strategy";
import { Authenticator } from "remix-auth";
import { IUser } from "~/models/User";
import { AuthStrategies } from "~/services/auth_strategies";
import { sessionStorage } from "~/services/session.server";

export type AuthStrategy = typeof AuthStrategies[keyof typeof AuthStrategies];

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<IUser>(sessionStorage);

// Register your strategies below
authenticator.use(formStrategy, AuthStrategies.FORM);
