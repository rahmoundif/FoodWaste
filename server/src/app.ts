import createApp from "./lib/create-app";
import auth from "./routes/auth-route";
import { profileRoute } from "./routes/profile-route";
import userRoute from "./routes/user-route";

const app = createApp();

const routes = [auth] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

app.route("/profile", profileRoute);
app.route("/users", userRoute);

export default app;
