import { OpenAPIHono } from "@hono/zod-openapi";
import auth from "./routes/auth-route";
import { profileRoute } from "./routes/profile-route";
import userRoute from "./routes/user-route";
import notFound from "stoker/middlewares/not-found";
import { onError } from "stoker/middlewares";
import { pLogger } from "./middlewares/pino-logger";

const app = new OpenAPIHono();
app.use(pLogger());
const routes = [auth] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});



app.get("error", (c) => {
  c.status(422)
  throw new Error("Dammit!");
}),

app.onError(onError);
app.notFound(notFound);

app.get("/", (c) => c.json({ message: "Bienvenue sur l'API FoodWaste!" }));
app.route("/profile", profileRoute);
app.route("/users", userRoute);

export default app;
