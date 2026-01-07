import { Hono } from "hono";
import { db } from "../db";
import { user } from "../db/auth-schema";
import { eq } from "drizzle-orm";

const userRoute = new Hono();

// Get all users
userRoute.get("/", async (c) => {
  const users = await db.select().from(user);
  return c.json(users);
});

// Get user by ID
userRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const userData = await db.select().from(user).where(eq(user.id, id));

  if (userData.length === 0) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.json(userData[0]);
});

export default userRoute;
