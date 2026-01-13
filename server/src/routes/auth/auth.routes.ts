import { Hono } from "hono";
import { auth } from "@/lib/auth";
import type { AuthType } from "@/lib/types";
import { db } from "@/db";
import { profile } from "@/db/schema";
import { selectUserSchema, insertUserSchema } from "@/db/auth-schema";
import { createRoute, z } from "@hono/zod-openapi";
import * as httpsStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import createErrorSchema from "stoker/openapi/schemas/create-error-schema";

const tags = ["Auth"];

export const router = new Hono<{ Bindings: AuthType }>({
  strict: false,
});

// Intercept sign-up to create profile
router.post("/auth/sign-up/email", async (c) => {
  const response = await auth.handler(c.req.raw);

  if (response.status === 200) {
    const data = (await response.clone().json()) as AuthType["Variables"];

    if (data.user) {
      await db
        .insert(profile)
        .values({
          userId: data.user.id,
          admin: false,
        })
        .catch(() => {});
    }
  }

  return response;
});

router.on(["POST", "GET", "DELETE", "PUT"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});


export const user = createRoute({
  path: "/auth/user",
  method: "get",
  tags,
  responses: {
    [httpsStatusCodes.OK]: jsonContent(
      z.array(selectUserSchema),
      "List of users"
    ),
  },
});

export const createUser = createRoute({
  path: "/auth/sign-up/email",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertUserSchema, "User to create"),
  },
  responses: {
    [httpsStatusCodes.CREATED]: jsonContent(selectUserSchema, "Created user"),

    [httpsStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertUserSchema),
      "Validation error"
    ),
  },
});

export type User = typeof user;
export type CreateUser = typeof createUser;
