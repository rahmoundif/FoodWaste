import { db } from "@/db";
import type { AppRouteHandler } from "@/lib/types";
import type { Category } from "./category.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";

export const listCategory: AppRouteHandler<Category> = async (c) => {
	const categories = await db.query.category.findMany();
	return c.json(categories, HttpStatusCodes.OK);
};
