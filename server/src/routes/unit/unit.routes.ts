import { createRoute } from "@hono/zod-openapi";
import z from "zod";
import * as httpsStatusCodes from "stoker/http-status-codes";
import {
  selectUnitSchema,
  insertUnitSchema,
  deleteUnitSchema,
} from "@/db/schema";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
const tags = ["Public - Unit"];

export const units = createRoute({
  path: "/unit",
  method: "get",
  tags,
  responses: {
    [httpsStatusCodes.OK]: jsonContent(
      z.array(selectUnitSchema),
      "List of units"
    ),
    [httpsStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "Units not found"
    ),
  },
});

export const addUnit = createRoute({
  path: "/unit",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertUnitSchema, "Add a unit"),
  },
  responses: {
    [httpsStatusCodes.OK]: jsonContent(insertUnitSchema, "Created unit"),
    [httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      z.object({ message: z.string() }),
      "Validation error"
    ),
    [httpsStatusCodes.CONFLICT]: jsonContent(
      z.object({ message: z.string() }),
      "Unit already exists"
    ),
  },
});

export const deleteUnit = createRoute({
  path: "/unit",
  method: "delete",
  tags,
  request: {
    body: jsonContentRequired(deleteUnitSchema, "Delete a unit"),
  },
  responses: {
    [httpsStatusCodes.OK]: jsonContent(deleteUnitSchema, "Deleted unit"),
    [httpsStatusCodes.NOT_FOUND]: jsonContent(
      z.object({ message: z.string() }),
      "Unit not found"
    ),
    [httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      z.object({ message: z.string() }),
      "Validation error"
    ),
  },
});

export type unitType = typeof units;
export type addUnitType = typeof addUnit;
export type deleteUnitType = typeof deleteUnit;
