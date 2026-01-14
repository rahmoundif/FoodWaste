import type { PinoLogger } from "hono-pino";
import type { auth } from "@/lib/auth";
import type { RouteHandler, RouteConfig, OpenAPIHono } from "@hono/zod-openapi";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}

export type AuthType = AppBindings;
export type AppAPI = OpenAPIHono<AppBindings>;
export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
