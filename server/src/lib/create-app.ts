
import notFound from "stoker/middlewares/not-found";
import { onError, serveEmojiFavicon } from "stoker/middlewares";
import { PLogger } from "@/middlewares/pino-logger";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { AppBindings } from "@/lib/types";


  export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(PLogger());
  app.use(serveEmojiFavicon("🍔"));
  app.onError(onError);
  app.notFound(notFound);

  return app;
}
