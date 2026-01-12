import type { PinoLogger } from "hono-pino";
import type { auth } from "@/lib/auth";
import { OpenAPIHono } from "@hono/zod-openapi";

export interface AppBindings{
  Variables: {
    logger: PinoLogger;
  };
}

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export type AppAPI = OpenAPIHono<AppBindings>;