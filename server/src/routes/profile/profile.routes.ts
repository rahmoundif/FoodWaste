// import { Hono } from "hono";
// import { db } from "@/db/index.js";
// import { profile} from "@/db/schema";
// import { eq } from "drizzle-orm";

// export const ProfileRoute = new Hono();

// ProfileRoute.get("/", async (c) => {
//   const allProfiles = await db.select().from(profile);

//   if(!allProfiles){
//     return c.json({message: "No profiles found"}, 404);
//   }

//   return c.json(allProfiles);

// });

// ProfileRoute.get("/:id", async (c) => {
//   const { id } = c.req.param();
//   const profileData = await db
//   .select()
//   .from(profile)
//   .where(eq(profile.id, Number(id)));

//   if (profileData.length === 0) {
//     return c.json({ message: "Profile not found" }, 404);
//   }

//   return c.json(profileData);
// });

import { insertProfileSchema, selectProfileSchema } from "@/db/schema";
import { createRoute, z } from "@hono/zod-openapi";
import { desc } from "drizzle-orm";
import * as httpsStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Profile"];

export const profile = createRoute({
  path: "/profile",
  method: "get",
  tags,
  responses: {
    [httpsStatusCodes.OK]: jsonContent(
      z.array(selectProfileSchema),
      "List of profiles"
    ),
  },
});
export const createProfile = createRoute({
  path: "/profile",
  method: "post",
  request: {
    body: jsonContentRequired(insertProfileSchema, "Profile to create"),
  },
  tags,
  responses: {
    [httpsStatusCodes.OK]: jsonContent(selectProfileSchema, "Created profile"),
    [httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertProfileSchema),
      "Validation error",
    )
  },
});

export type Profile = typeof profile;
export type CreateProfile = typeof createProfile;
