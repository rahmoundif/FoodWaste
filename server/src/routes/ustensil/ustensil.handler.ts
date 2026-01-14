import type { AppRouteHandler } from "@/lib/types";
import { db } from "@/db";
import { ustensil as ustensilData } from "@/db/schema";
import * as httpsStatusCodes from "stoker/http-status-codes";
import type {
  addUstensilType,
  ustensilType,
  deleteUstensilType,
} from "./ustensil.routes";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const listUstensils: AppRouteHandler<ustensilType> = async (c) => {
  const ustensils = await db.query.ustensil.findMany();
  return c.json(ustensils, httpsStatusCodes.OK);
};

export const addUstensil: AppRouteHandler<addUstensilType> = async (c) => {
  const addedUstensil = c.req.valid("json");
  const existingUstensil = await db.query.ustensil.findFirst({
    where: eq(ustensilData.name, addedUstensil.name),
  });
  if (existingUstensil) {
    return c.json(
      { message: "Ustensil already exists" },
      httpsStatusCodes.CONFLICT
    );
  }
  const [insertUstensil] = await db
    .insert(ustensilData)
    .values(addedUstensil)
    .returning();
  return c.json(insertUstensil, httpsStatusCodes.OK);
};

export const deleteUstensil: AppRouteHandler<deleteUstensilType> = async (
  c
) => {
  const deletedUstensil = c.req.valid("json");
  const [removedUstensil] = await db
    .delete(ustensilData)
    .where(eq(ustensilData.id, deletedUstensil.id))
    .returning();

  if (!removedUstensil) {
    return c.json(
      { message: "Ustensil not found" },
      httpsStatusCodes.NOT_FOUND
    );
  }

  return c.json(removedUstensil, httpsStatusCodes.OK);
};
