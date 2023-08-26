// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import { FormStrategy } from "remix-auth-form";
import zod from "zod";
import { Users, IUser } from "~/models";

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

export const formStrategy = new FormStrategy<IUser>(
  async ({ form, context }) => {
    const formData = form.get("formData")?.toString();

    try {
      const data = schema.parse(JSON.parse(formData ?? "{}"));

      console.log(data);
      // Return the user object

      console.log(Users.users);

      const user = Users.login(data.email, data.password);

      if (!user) {
        return Promise.reject(null);
      }

      return user;
    } catch (e) {
      console.log(e);
      return Promise.reject(null);
    }
  }
);
