import type { AppRouteHandler } from "@/lib/types";
import { db } from "@/db";
import type { Diet } from "./diet.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const listDiet: AppRouteHandler<Diet> = async (c) => {
	const diets = await db.query.diet.findMany();
	return c.json(diets, HttpStatusCodes.OK);
};
