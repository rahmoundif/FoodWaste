import { auth } from "@/lib/auth";
import type { Role } from "@/db/schema";
import { createMiddleware } from "hono/factory";
import * as httpsStatusCodes from "stoker/http-status-codes";
import { AuthType } from "@/lib/types";

export const authMiddleware = createMiddleware<AuthType>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }
  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

export const requireAuth = createMiddleware<AuthType>(async (c, next) => {
  const session = c.get("session");

  if (!session) {
    return c.json({ error: "Unauthorized" }, httpsStatusCodes.UNAUTHORIZED);
  }

  return next();
});

export const requireRole = (...roles: Role[]) => {
  return createMiddleware<AuthType>(async (c, next) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ error: "Unauthorized" }, httpsStatusCodes.UNAUTHORIZED);
    }

    if (!roles.includes(user.role as Role)) {
      return c.json(
        { error: "Forbidden - Insufficient permissions" },
        httpsStatusCodes.FORBIDDEN
      );
    }

    return next();
  });
};
