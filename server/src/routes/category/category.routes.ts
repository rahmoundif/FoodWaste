import { createRoute, z } from "@hono/zod-openapi";
import * as httpsStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { selectCategorySchema } from "@/db/schema";

const tags = ["Public - Category"];

export const category = createRoute({
  path: "/category",
  method: "get",
  tags,
  responses: {
    [httpsStatusCodes.OK]: jsonContent(
      z.array(selectCategorySchema),
      "List of categories"
    ),
  },
});

export type Category = typeof category;
