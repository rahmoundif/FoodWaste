import { drizzle } from "drizzle-orm/node-postgres";
import env from "../middlewares/env.js";
import * as schema from "./schema";
import * as auth from "./auth-schema";

export const db = drizzle(env.DATABASE_URL, { schema: { ...schema, ...auth } });
export { schema };
export { auth };
