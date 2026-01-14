import { createRouter } from "@/lib/create-app";
import * as handlers from "./unit.handler";
import * as routes from "./unit.routes";

const router = createRouter()
.openapi(routes.units, handlers.listUnit)
.openapi(routes.addUnit, handlers.addUnit)
.openapi(routes.deleteUnit, handlers.deleteUnit);

export default router;
