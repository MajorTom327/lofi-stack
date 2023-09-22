import { prisma } from "~/db.server";

import { User } from "./User";

export type { IUser } from "./User";

export const Users = new User(prisma);

export default {
  Users,
};
