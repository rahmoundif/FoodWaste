import { createRoute } from "@hono/zod-openapi";
import z from "zod";
import * as httpsStatusCodes from "stoker/http-status-codes";
import {
	deleteIngredientSchema,
	insertIngredientSchema,
	selectIngredientSchema,
} from "@/db/schema";
import { jsonContentRequired, jsonContent } from "stoker/openapi/helpers";
const tags = ["Public - Ingredient"];

export const ingredients = createRoute({
	path: "/ingredient",
	method: "get",
	tags,
	responses: {
		[httpsStatusCodes.OK]: jsonContent(
			z.array(selectIngredientSchema),
			"List of ingredients",
		),
		[httpsStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Ingredients not found",
		),
	},
});

export const addIngredient = createRoute({
	path: "/ingredient",
	method: "post",
	tags,
	request: {
		body: jsonContentRequired(insertIngredientSchema, "Add an ingredient"),
	},
	responses: {
		[httpsStatusCodes.OK]: jsonContent(
			selectIngredientSchema,
			"Created ingredient",
		),
		[httpsStatusCodes.CONFLICT]: jsonContent(
			z.object({ message: z.string() }),
			"Ingredient already exists",
		),
		[httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			z.object({ message: z.string() }),
			"Validation error",
		),
	},
});

export const deleteIngredient = createRoute({
	method: "delete",
	path: "/ingredient",
	tags,
	request: {
		body: jsonContentRequired(deleteIngredientSchema, "Delete an ingredient"),
	},
	responses: {
		[httpsStatusCodes.OK]: jsonContent(
			selectIngredientSchema,
			"Deleted ingredient",
		),
		[httpsStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Ingredient not found",
		),
		[httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			z.object({ message: z.string() }),
			"Validation error",
		),
	},
});

export type ingredientType = typeof ingredients;
export type addIngredientType = typeof addIngredient;
export type deleteIngredientType = typeof deleteIngredient;
