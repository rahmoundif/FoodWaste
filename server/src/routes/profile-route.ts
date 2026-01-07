import { Hono } from "hono";
import { db } from "../db/index.js";
import { profile} from "../db/schema";
import { eq } from "drizzle-orm";

export const profileRoute = new Hono();

profileRoute.get("/", async (c) => {
  const allProfiles = await db.select().from(profile);
  
  
  if(!allProfiles){
    return c.json({message: "No profiles found"}, 404);
  } 
  
  return c.json(allProfiles);
  
});

profileRoute.get("/:id", async (c) => {
  const { id } = c.req.param();
  const profileData = await db
  .select()
  .from(profile)
  .where(eq(profile.id, Number(id)));

  if (profileData.length === 0) {
    return c.json({ message: "Profile not found" }, 404);
  }

  return c.json(profileData);
});



