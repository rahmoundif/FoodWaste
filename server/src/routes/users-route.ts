import { Hono } from "hono";
import { db } from "../db/index.js";
import { users } from "../db/schema";

export const usersRoute = new Hono();

usersRoute.get("/", async (c) => {
  const allUsers = await db.select().from(users);
  return c.json(allUsers);
});
