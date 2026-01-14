import { createRouter } from "@/lib/create-app"
import * as handlers from "./ingredient.handler"
import * as routes from "./ingredient.routes";

const router= createRouter()
.openapi(routes.ingredients, handlers.listIngredients)
.openapi(routes.addIngredient, handlers.addIngredient)
.openapi(routes.deleteIngredient, handlers.deleteIngredient);

export default router;