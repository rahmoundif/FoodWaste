import * as handlers from "./ustensil.handler";
import * as routes from "./ustensil.routes";
import { createRouter } from "@/lib/create-app";

const router = createRouter()
  .openapi(routes.ustensils, handlers.listUstensils)
  .openapi(routes.addUstensil, handlers.addUstensil)
  .openapi(routes.deleteUstensil, handlers.deleteUstensil);

export default router;