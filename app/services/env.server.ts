import configure from "env-refiner";
import zod from "zod";

export const Env = configure({
  schema: zod.object({
    APP_URL: zod.string().url(),
    SESSION_SECRET: zod.string(),
  }),
});
export default Env;
