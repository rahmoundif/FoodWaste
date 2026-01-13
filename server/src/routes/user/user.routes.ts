import { Hono } from "hono";
import { db } from "@/db";
import { user } from "@/db/auth-schema";
import { eq } from "drizzle-orm";

const userRoute = new Hono();


userRoute.get("/", async (c) => {
  const users = await db.select().from(user);
  return c.json(users);
});



userRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const userData = await db.select().from(user).where(eq(user.id, id));

  if (userData.length === 0) {
    return c.json({ message: "Utilisateur non trouvé" }, 404);
  }

  return c.json(userData[0]);
});




userRoute.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const userData = await db.select().from(user).where(eq(user.id, id));
  
  if (userData.length === 0) {
    return c.json({ message: "Utilisateur non trouvé" }, 404);
  }
  
  await db.delete(user).where(eq(user.id, id));
  return c.json({ message: "Utilisateur supprimé avec succès" });
});



userRoute.put("/:id", async (c) => {
  const id = c.req.param("id");
  const { name, email, image } = await c.req.json();
  
  const userData = await db.select().from(user).where(eq(user.id, id));
  
  if (userData.length === 0) {
    return c.json({ message: "Utilisateur non trouvé" }, 404);
  }
  
  await db.update(user).set({ name, email,image }).where(eq(user.id, id));
  return c.json({ message: "Utilisateur mis à jour avec succès" });
});

export default userRoute;