import { createRouter } from "@/lib/create-app";
import * as handlers from "./auth.handler";
import * as routes from "./auth.routes";

const router = createRouter()
.openapi(routes.user, handlers.listUsers)
.openapi(routes.createUser, handlers.createUser);

export default router