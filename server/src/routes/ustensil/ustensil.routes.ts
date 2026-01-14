import { createRoute, z } from "@hono/zod-openapi";
import * as httpsStatusCodes from "stoker/http-status-codes";
import {
	deleteUstensilSchema,
	insertUstensilSchema,
	selectUstensilSchema,
} from "@/db/schema";
import { jsonContentRequired, jsonContent } from "stoker/openapi/helpers";
const tags = ["Public - Ustensil"];

export const ustensils = createRoute({
	path: "/ustensil",
	method: "get",
	tags,
	responses: {
		[httpsStatusCodes.OK]: jsonContent(
			z.array(selectUstensilSchema),
			"List of ustensils",
		),
	},
});

export const addUstensil = createRoute({
	path: "/ustensil",
	method: "post",
	tags,
	request: {
		body: jsonContentRequired(insertUstensilSchema, "Add an ustensil"),
	},
	responses: {
		[httpsStatusCodes.OK]: jsonContent(
			selectUstensilSchema,
			"Created ustensil",
		),
		[httpsStatusCodes.CONFLICT]: jsonContent(
			z.object({ message: z.string() }),
			"Ustensil already exists",
		),
		[httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			z.object({ message: z.string() }),
			"Validation error",
		),
	},
});

export const deleteUstensil = createRoute({
	path: "/ustensil",
	method: "delete",
	tags,
	request: {
		body: jsonContentRequired(deleteUstensilSchema, "Delete an ustensil"),
	},
	responses: {
		[httpsStatusCodes.OK]: jsonContent(
			selectUstensilSchema,
			"Deleted ustensil",
		),
		[httpsStatusCodes.NOT_FOUND]: jsonContent(
			z.object({ message: z.string() }),
			"Ustensil not found",
		),
		[httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
			z.object({ message: z.string() }),
			"Validation error",
		),
	},
});

export type ustensilType = typeof ustensils;
export type addUstensilType = typeof addUstensil;
export type deleteUstensilType = typeof deleteUstensil;
