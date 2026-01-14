import { db } from "@/db";
import { ingredient as ingredientData } from "@/db/schema";
import * as httpsStatusCodes from "stoker/http-status-codes";
import type { AppRouteHandler } from "@/lib/types";
import { eq } from "drizzle-orm";
import type {
	ingredientType,
	addIngredientType,
	deleteIngredientType,
} from "./ingredient.routes";

export const listIngredients: AppRouteHandler<ingredientType> = async (c) => {
	const ingredients = await db.query.ingredient.findMany();
	return c.json(ingredients, httpsStatusCodes.OK);
};

export const addIngredient: AppRouteHandler<addIngredientType> = async (c) => {
	const addedIngredient = c.req.valid("json");
	const existingIngredient = await db.query.ingredient.findFirst({
		where: eq(ingredientData.name, addedIngredient.name),
	});
	if (existingIngredient) {
		return c.json(
			{ message: "Ingredient already exists" },
			httpsStatusCodes.CONFLICT,
		);
	}
	const [insertIngredient] = await db
		.insert(ingredientData)
		.values(addedIngredient)
		.returning();
	return c.json(insertIngredient, httpsStatusCodes.OK);
};

export const deleteIngredient: AppRouteHandler<deleteIngredientType> = async (
	c,
) => {
	const deletedIngredient = c.req.valid("json");
	const [removedIngredient] = await db
		.delete(ingredientData)
		.where(eq(ingredientData.id, deletedIngredient.id))
		.returning();

	if (!removedIngredient) {
		return c.json(
			{ message: "Ingredient not found" },
			httpsStatusCodes.NOT_FOUND,
		);
	}

	return c.json(removedIngredient, httpsStatusCodes.OK);
};
