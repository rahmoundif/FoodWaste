import { db } from "@/db";
import { AppRouteHandler } from "@/lib/types";
import * as httpsStatusCodes from "stoker/http-status-codes";
import type { addUnitType, deleteUnitType, unitType } from "./unit.routes";
import { unit as unitData } from "@/db/schema";
import { eq } from "drizzle-orm";

export const listUnit: AppRouteHandler<unitType> = async (c) => {
    const units = await db.query.unit.findMany();
    return c.json(units, httpsStatusCodes.OK);
};

export const addUnit: AppRouteHandler<addUnitType> = async (c) => {
    const addedUnit = c.req.valid("json");
    const existingUnit = await db.query.unit.findFirst({
        where: eq(unitData.name, addedUnit.name),
    });
    if (existingUnit) {
        return c.json(
            { message: "Unit already exists" },
            httpsStatusCodes.CONFLICT,
        );
    }
    const [insertUnit] = await db
        .insert(unitData)
        .values(addedUnit)
        .returning();
    return c.json(insertUnit, httpsStatusCodes.OK);
}

export const deleteUnit: AppRouteHandler<deleteUnitType> = async (c) => {
    const deletedUnit = c.req.valid("json");
    const [removedUnit] = await db
        .delete(unitData)
        .where(eq(unitData.id, deletedUnit.id))
        .returning();

    if (!removedUnit) {
        return c.json(
            { message: "Unit not found" },
            httpsStatusCodes.NOT_FOUND,
        );
    }

    return c.json(removedUnit, httpsStatusCodes.OK);
}
