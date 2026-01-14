import { createRouter } from "@/lib/create-app";
import * as handlers from "./diet.handler";
import * as routes from "./diet.routes";

const router = createRouter().openapi(routes.diet, handlers.listDiet);

export default router;
