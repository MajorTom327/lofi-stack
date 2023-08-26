import { v4 as uuid } from "uuid";
import zod from "zod";

const createUserInput = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

const userSchema = zod.object({
  id: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
});

export type IUser = zod.infer<typeof userSchema>;

export class User {
  users: IUser[] = [
    {
      id: "1",
      email: "jconnor@sky.net",
      password: "password",
    },
  ];

  create(input: any) {
    const user = createUserInput.parse(input);

    this.users.push({ id: uuid(), ...user });
    return user;
  }

  login(email: string, password: string) {
    const user = this.users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  get(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

export default User;
