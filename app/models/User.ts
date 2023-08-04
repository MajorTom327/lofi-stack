import zod from "zod";

export interface IUser {
  id?: string;
  username: string;
  email: string;
  password: string; // HASHED

  save(): void;
}

const schema = zod.object({
  id: zod.string().optional(),
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
});

export class User implements IUser {
  id?: string;
  username: string;
  email: string;
  password: string;

  constructor(user: any) {
    const parsed = schema.parse(user);

    this.id = parsed.id;
    this.username = parsed.username;
    this.email = parsed.email;
    this.password = parsed.password;
  }

  public static create(email: string, password: string): IUser {
    throw new Error("Method not implemented.");
  }

  public static login(email: string, password: string): IUser {
    if (email === "jconnor@sky.net" && password === "12345678") {
      return new User({
        id: "1",
        username: "jconnor",
        email: "jconnor@sky.net",
        password: "12345678",
      });
    }
    throw new Error("Method not implemented.");
  }

  public static get(id: string): IUser {
    throw new Error("Method not implemented.");
  }

  public static getPage(page: number, limit: number = 10): IUser[] {
    throw new Error("Method not implemented.");
  }

  public static search(query: string): IUser[] {
    throw new Error("Method not implemented.");
  }

  public save(): void {}
}

export default User;
