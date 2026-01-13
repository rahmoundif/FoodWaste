import createApp from "@/lib/create-app";
import auth from "@/routes/auth/auth.routes";
import userRoute from "@/routes/user/user.routes";
import ConfigApi from "./lib/configure-api";
import index from "@/routes/index-route";
import tasks from "@/routes/tasks/tasks.index";
import profile from "@/routes/profile/profile.index";

const app = createApp();

const routes = [
  index,
  tasks,
  profile,
];


ConfigApi(app);
routes.forEach((route) => {
  app.route("/", route);
});

app.basePath("/connexion").route("/", auth);
// app.route("/profile", profile);
app.route("/users", userRoute);

// Test error route
app.get("/error", (c) => {
  c.var.logger.debug("Generating an error for testing purposes");
  throw new Error("Dammit!");
});

export default app;
