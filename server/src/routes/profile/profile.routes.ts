import { insertProfileSchema, selectProfileSchema } from "@/db/schema";
import { createRoute, z } from "@hono/zod-openapi";
import * as httpsStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["Profile"];

export const profile = createRoute({
  path: "/profile",
  method: "get",
  tags,
  responses: {
    [httpsStatusCodes.OK]: jsonContent(
      z.array(selectProfileSchema),
      "List of profiles"
    ),
  },
});


// export const createProfile = createRoute({
//   path: "/profile",
//   method: "post",
//   request: {
//     body: jsonContentRequired(insertProfileSchema, "Profile to create"),
//   },
//   tags,
//   responses: {
//     [httpsStatusCodes.OK]: jsonContent(selectProfileSchema, "Created profile"),
//     [httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
//       createErrorSchema(insertProfileSchema),
//       "Validation error",
//     )
//   },
// });

export type Profile = typeof profile;
// export type CreateProfile = typeof createProfile;
