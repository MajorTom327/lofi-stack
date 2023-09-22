// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import { isNilOrEmpty } from "ramda-adjunct";
import { AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import zod from "zod";
import { UserController } from "~/controllers";
import type { IUser } from "~/models";

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

export const formStrategy = new FormStrategy<IUser>(
  async ({ form }): Promise<IUser> => {
    try {
      const formData = Object.fromEntries(form.entries());
      const data = schema.parse(formData);

      const userController = new UserController();
      const user = await userController.login(data.email, data.password);

      if (isNilOrEmpty(user)) {
        throw new AuthorizationError("Invalid credentials");
      }
      return user!;
    } catch (e) {
      console.log(e);
      throw new AuthorizationError("Invalid credentials");
    }
  }
);
