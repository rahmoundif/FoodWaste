import type { AppRouteHandler } from "@/lib/types";
import type { User, CreateUser } from "./auth.routes";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { db } from "@/db";
import { auth } from "@/lib/auth";

export const listUsers: AppRouteHandler<User> = async (c) => {
  const users = await db.query.user.findMany();
  return c.json(users);
};

export const createUser: AppRouteHandler<CreateUser> = async (c) => {
  const user = c.req.valid("json");
  const result = await auth.api.signUpEmail({
    body: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
  });
  return c.json(result.user, HttpStatusCodes.CREATED);
};
