import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { user } from "@/db/auth-schema";

export const UserSelectSchema = createSelectSchema(user);

export const UserUpdateSchema = createUpdateSchema(user);
