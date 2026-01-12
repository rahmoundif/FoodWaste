import createApp from "@/lib/create-app";
import auth from "@/routes/auth-route";
import { profileRoute } from "@/routes/profile-route";
import userRoute from "@/routes/user-route";
import ConfigApi from "./lib/configure-api";
import index from "@/routes/index-route";


const app = createApp();
const routes = [
  index
]
ConfigApi(app);
routes.forEach((route) => {
  app.route("/", route);
});
// Root route
app.get("/", (c) => c.json({ message: "Bienvenue sur l'API FoodWaste!" }));

// API routes

app.basePath("/connexion").route("/", auth);
app.route("/profile", profileRoute);
app.route("/users", userRoute);

// Test error route
app.get("/error", (c) => {
  c.var.logger.debug("Generating an error for testing purposes");
  throw new Error("Dammit!");
});

export default app;
