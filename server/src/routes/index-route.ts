import { createRouter } from "@/lib/create-app";
import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as httpsStatusCodes from "stoker/http-status-codes";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const router = createRouter().openapi(
	createRoute({
		tags: ["Index"],
		method: "get",
		path: "/",
		responses: {
			[httpsStatusCodes.OK]: jsonContent(
				createMessageObjectSchema("WasteFood Api"),
				"WF Index",
			),
		},
	}),
	(c) => {
		return c.json(
			{
				message: "WF api",
			},
			httpsStatusCodes.OK,
		);
	},
);

export default router;
