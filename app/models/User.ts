import type { PrismaClient } from "@prisma/client";
import SHA512 from "crypto-js/sha512";
import { evolve } from "ramda";
import zod from "zod";

const userSchema = zod.object({
  id: zod.string(),

  email: zod.string().email(),
  password: zod.string().min(8),

  createdAt: zod.coerce.date(),
  updatedAt: zod.coerce.date(),
});

const createUserInput = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type IUser = zod.infer<typeof userSchema>;

export class User {
  client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  private hashPassword(password: string) {
    return SHA512(password).toString();
  }

  create(input: any): Promise<IUser> {
    const user = createUserInput.parse(input);

    return this.client.user.create({
      data: evolve({ password: this.hashPassword }, user),
    });
  }

  async login(email: string, password: string): Promise<IUser | null> {
    const user = await this.client.user.findUnique({
      where: {
        email: email,
        password: this.hashPassword(password),
      },
    });

    return user as IUser | null;
  }

  get(id: string): Promise<IUser | null> {
    return this.client.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}

export default User;
