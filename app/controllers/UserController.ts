import { isNotNilOrEmpty } from "ramda-adjunct";
import type { IUser } from "~/models";
import { Users } from "~/models";

import logger from "~/services/logger.server";

export class UserController {
  userId?: string;

  constructor(userId?: string) {
    this.userId = userId;
  }

  createUser(input: any) {
    logger.info(`Creating user ${input.email}`);
    return Users.create(input).then((user) => {
      this.userId = user.id;
      logger.info(`Created user ${user.id}`);
      return user;
    });
  }

  login(email: string, password: string): Promise<IUser | null> {
    return Users.login(email, password).then((user: IUser | null) => {
      if (isNotNilOrEmpty(user)) {
        this.userId = user!.id;
      }
      return user;
    });
  }
}

export default UserController;
