import type { AppRouteHandler } from "@/lib/types";
import { CreateProfile, Profile } from "./profile.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { db, schema } from "@/db";

export const listProfile: AppRouteHandler<Profile> = async (c) => {
  const profiles = await db.query.profile.findMany();
  return c.json(profiles);
};

export const createProfile: AppRouteHandler<CreateProfile> = async (c) => {
  const profile = c.req.valid("json");
  const [insertedProfile] = await db
    .insert(schema.profile)
    .values(profile)
    .returning();
  return c.json(insertedProfile, HttpStatusCodes.OK);
};
