import createApp from "@/lib/create-app";
import ConfigApi from "./lib/configure-api";
import index from "@/routes/index-route";
import { auth } from "./lib/auth";

const app = createApp();

const routes = [index];

await ConfigApi(app);
routes.forEach((route) => {
  app.route("/", route);
});

app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/error", (c) => {
  c.var.logger.debug("Generating an error for testing purposes");
  throw new Error("Dammit!");
});

export default app;
