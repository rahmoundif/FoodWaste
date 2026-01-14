import { createRoute } from "@hono/zod-openapi";
import z from "zod";
import * as httpsStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { selectDietSchema } from "@/db/schema";

const tags = ["Public - Diet"];

export const diet = createRoute({
    path: "/diet",
    method: "get",
    tags,
    responses: {
        [httpsStatusCodes.OK]: jsonContent(
            z.array(selectDietSchema),
            "List of diets"
        ),
    },
});

export type Diet = typeof diet;