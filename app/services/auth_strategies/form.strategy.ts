// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import { FormStrategy } from "remix-auth-form";
import zod from "zod";
import User, { IUser } from "~/models/User";

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

export const formStrategy = new FormStrategy<IUser>(
  async ({ form, context }) => {
    // Do something with the tokens and profile

    try {
      const data = schema.parse(Object.fromEntries(form.entries()));

      console.log(data);
      // Return the user object

      const user = User.login(data.email, data.password);

      return user;
    } catch (e) {
      console.log(e);
      return Promise.reject(null);
    }
  }
);
